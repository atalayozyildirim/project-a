import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/logout", (req: Request, res: Response) => {
  if (req.session) {
    (req.session as any).currentUser = null;
  }

  res.status(200).redirect("/");
});

export default router;
