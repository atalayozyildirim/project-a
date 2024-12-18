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
  if (
    !req.session?.jwt ||
    !req.headers.X_Auth_token ||
    typeof req.headers.X_Auth_token !== "string"
  ) {
    return res.status(401).send({ message: "Not authorized" });
  }

  try {
    const token = req.headers.X_Auth_token.split(" ")[1];
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
