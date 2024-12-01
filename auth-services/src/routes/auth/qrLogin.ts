import type { json, Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import { Auth } from "../../model/AuthModel";

const router = express.Router();

router.get("/login/qr/:token", async (req: Request, res: Response) => {});

export default router;
