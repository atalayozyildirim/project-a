import express from "express";
import type { Request, Response } from "express";
import qrCode from "qrcode";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/login/qr", async (req: Request, res: Response) => {
  try {
    const randomString = crypto.randomBytes(16).toString("hex");

    const jwtToken = jwt.sign({ randomString }, process.env.JWT_KEY as string, {
      expiresIn: "1h",
    });

    const qrCodeData = await qrCode.toDataURL(jwtToken);

    res.json({ qrCodeData });
  } catch (err) {
    console.log("Error creating QR code");
  }
});
export default router;
