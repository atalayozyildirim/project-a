import express from "express";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  const { acsess_token, refresh_token } = req.cookies;

  if (!acsess_token || !refresh_token) throw new Error("Not authenticated");

  //@ts-ignore
  const token = acsess_token.split(" ")[1];
  const refreshToken = refresh_token.split(" ")[1];
  console.log(token, refreshToken);

  const verify = jwt.verify(token, Bun.env.JWT_KEY!);

  console.log(verify);

  /*
    const verify = jwt.verify(
      token,
      Bun.env.JWT_KEY!,
      (err: jwt.VerifyErrors | null, dec: any) => {
        if (!err) {
          const refreshToken = X_Refresh_token?.split(" ")[1];

          if (!refreshToken) {
            throw new Error("Not authenticated");
          }

          const verify = jwt.verify(
            refreshToken,
            Bun.env.JWT_KEY!,
            (err: jwt.VerifyErrors | null, dec: any) => {
              if (err) {
                throw new Error("NOT EXPIRED");
              }

              const acsessToken = jwt.sign(dec.id, Bun.env.JWT_KEY!, {
                expiresIn: "1h",
              });

              return res.json({ token: acsessToken, userId: dec.id });
            }
          );
          console.log(verify);
        }
      }
    );
    */
});

export default router;
