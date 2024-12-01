import type { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Session } from "express-session";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session || !("jwt" in req.session)) {
    return next();
  }
  try {
    const payload = jwt.verify(
      (req.session as Session & { jwt: string }).jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
