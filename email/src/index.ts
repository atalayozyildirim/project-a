import express from "express";
import type { Request, Response } from "express";
import email from "./routes/";

const router = express.Router();

router.use("/email", email);

export default router;
