import type { Request, Response } from "express";
import { Subject } from "microserivce-common";
import express from "express";
import { AuthPublisherCreated } from "../../event/publisher.ts/auth-publisher-created";
import { rabbit } from "../../event/rabbitmqWrapper";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { Auth } from "../../model/AuthModel";
import reqIp from "request-ip";
import { NotificationsPublisher } from "../../event/publisher.ts/notification";

const router = express.Router();

router.post(
  "/login",
  [body("email").isEmail().notEmpty().isString(), body("password").notEmpty()],
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    }

    const { email, password } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      res.status(400).json({ errors: "User not found" });
    }

    if (typeof password !== "string" || typeof user?.password !== "string") {
      throw new Error("Password or user password is not a string");
    }

    const isMatch = await compare(password, user?.password);

    if (!isMatch) {
      res.status(400).json({ errors: "Invalid credentials password" });
    }

    const ipAddress = reqIp.getClientIp(req);
    const currentTime = new Date().toLocaleString();
    const token = jwt.sign({ id: user?.id }, Bun.env.JWT_KEY!);

    if (!rabbit.client) {
      throw new Error("RabbitMQ client is not initialized");
    }

    await new AuthPublisherCreated(rabbit.client).publish(
      Subject.LoginCreated,
      {
        id: user?.id,
        email: user?.email,
        ipAddress: ipAddress || "",
      }
    );

    (req.session as any).jwt = token;
    const message = `User ${user.email} logged in from IP address ${ipAddress} at ${currentTime}`;

    await new NotificationsPublisher(rabbit.client).publish(
      Subject.NotifactionCreated,
      {
        message,
        userId: user?.id,
      }
    );
    res.json({ userId: user?.id, name: user?.name, token });
  }
);

export default router;
