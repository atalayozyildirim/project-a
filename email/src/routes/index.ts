import express from "express";
import email from "./email";
import { checkAuth } from "microserivce-common";

const router = express.Router();

// @ts-ignore
router.use("/email", checkAuth, email);

export default router;
