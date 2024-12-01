import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Auth } from "../../model/AuthModel";

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

    if (!existingUser) {
      throw new Error("User already exists");
    }

    const user = Auth.build({ email, password, name });

    await user.save();
    res.status(201).json({ message: "User created", redirect: "/login" });
  },
]);

export default router;
