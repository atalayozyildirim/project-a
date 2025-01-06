import express from "express";
import type { Request, Response } from "express";
import email from "./routes/";
import { checkAuth } from "microserivce-common";

const router = express.Router();

//@ts-ignore
router.use("/email", checkAuth, email);

export default router;
