import type { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sanitize = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = sanitizeHtml(obj[key]);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);

  next();
};

export { sanitizeMiddleware };
