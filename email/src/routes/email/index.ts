import express from "express";
import type { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import NodeMail from "../../../config/nodeMailler";
import { NodeImap } from "../../../config/noodeImap";
import { Email } from "../../../model/Email";

const router = express.Router();

interface EmailConfig {
  userId: string;
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  tls: boolean;
  secure: boolean;
}

router.post(
  "/get/config",
  [body("userId").notEmpty().isString().withMessage("userId is required")],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      res.status(400).json({ errors: validationResult(req).array() });
    }
    const find = await Email.findOne({ userId: req.body.userId });

    if (!find) {
      throw new Error("Email configuration not found");
    }

    res.status(200).json(find);
  }
);
router.post(
  "/config",
  [
    body("host").isString().notEmpty(),
    body("port").isInt().notEmpty(),
    body("user").isString().notEmpty(),
    body("password").isString().notEmpty(),
    body("tls").isBoolean().notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const { userId, host, port, user, password, tls } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const config: EmailConfig = {
      userId: userId,
      host,
      port,
      auth: {
        user,
        pass: password,
      },
      tls,
      secure: false,
    };

    try {
      const data = await Email.build(config).save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to save configuration" });
    }
  }
);

router.post(
  "/send",
  [
    body("userId").isMongoId().notEmpty(),
    body("to").isEmail().notEmpty(),
    body("subject").isString().notEmpty(),
    body("text").isString().notEmpty(),
    body("from").isEmail().notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { userId, to, subject, text, from } = req.body;

    const config = await Email.findOne({ userId }).exec();

    if (!config) {
      throw new Error("Email configuration not found");
    }

    try {
      const nodeMailConfig = new NodeMail(
        config.host,
        config.port,
        config.secure,
        config.auth
      );
      await nodeMailConfig.sendMail(to, subject, text, from);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send email" });
    }
  }
);

router.post(
  "/inbox",
  [
    body("userId").isMongoId().notEmpty(),
    body("user").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
    body("host").isString().notEmpty(),
    body("port").isInt().notEmpty(),
    body("tls").isBoolean().notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { userId, user, password, host, port, tls } = req.body;

    const configDataDb = await Email.findOne({ userId });

    if (!configDataDb) {
      throw new Error("Email configuration not found");
    }

    const imapConfig = {
      user: configDataDb.auth.user,
      password: configDataDb.auth.pass,
      host: configDataDb.host,
      port: configDataDb.port,
      tls: configDataDb.tls,
      secure: configDataDb.secure,
    };

    const nodeImap = new NodeImap(imapConfig);

    try {
      await nodeImap.connect();
      const emails = await nodeImap.getUnreadEmails();
      res.status(200).json(emails);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch emails" });
    }
  }
);
export default router;
