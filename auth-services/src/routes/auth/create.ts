import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Auth } from "../../model/AuthModel";
import { AuthPublisherCreated } from "../../event/publisher.ts/auth-publisher-created";
import { Subject } from "microserivce-common";
import { rabbit } from "../../event/rabbitmqWrapper";
import { UserPublisherCreated } from "../../event/publisher.ts/user-publisher-created";

const router = express.Router();

router.post("/register", [
  body("email").isEmail().trim().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;

    const existingUser = await Auth.find({ email });
    console.log(existingUser);
    if (existingUser.length === 1) {
      throw new Error("User already exists");
    }

    const user = Auth.build({ email, password, name });

    await new UserPublisherCreated(rabbit.client).publish(Subject.UserCreated, {
      email: user.email,
      name: user.name,
      tasks: [],
      id: user.id,
      role: "",
    });

    await user.save();

    res.status(201).json({ message: "User created", redirect: "/login" });
  },
]);

export default router;
