import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
      session?: {
        jwt?: string;
      };
    }
  }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  // çöz
  if (!req.cookies.acsess_token) {
    return res.status(401).send({ message: "Not authorized" });
  }

  try {
    const token = req.cookies.acsess_token.split(" ")[1];
    const payload = jwt.verify(
      token!,
      process.env.JWT_KEY!
    ) as unknown as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    return res.status(401).send({ message: "Not authorized" });
  }

  next();
};
