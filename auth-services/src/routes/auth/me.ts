import express from "express";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    const { acsess_token, refresh_token } = req.cookies;

    if (!acsess_token || !refresh_token) {
      throw new Error("Not authenticated");
    }

    const token = acsess_token.split(" ")[1];
    const refreshToken = refresh_token.split(" ")[1];

    jwt.verify(
      token,
      Bun.env.JWT_KEY!,
      (err: jwt.VerifyErrors | null, dec: any) => {
        if (err) {
          if (!refreshToken) {
            return res.status(401).json({ error: "Not authenticated" });
          }

          jwt.verify(
            refreshToken,
            Bun.env.JWT_KEY!,
            (err: jwt.VerifyErrors | null, dec: any) => {
              if (err) {
                return res.status(401).json({ error: "NOT EXPIRED" });
              }

              const acsessToken = jwt.sign({ id: dec.id }, Bun.env.JWT_KEY!, {
                expiresIn: "1h",
              });

              return res
                .status(200)
                .json({ token: acsessToken, userId: dec.id });
            }
          );
        } else {
          return res.status(200).json({ token, userId: dec.id });
        }
      }
    );
  } catch (err) {
    throw new Error("Not authenticated");
  }
});

export default router;
