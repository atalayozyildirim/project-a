import type { Request, Response } from "express";
import express from "express";
import { body, validationResult } from "express-validator";
import { Auth } from "../../model/AuthModel";

const router = express.Router();

router.post(
  "/delete-account",
  [body("email").isEmail().notEmpty().isString()],
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    }

    const { email } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      res.status(400).json({ errors: "User not found" });
    }

    await Auth.deleteOne({ email });

    user?.save();

    res.json({ message: "Account deleted successfully" });
  }
);

export default router;
