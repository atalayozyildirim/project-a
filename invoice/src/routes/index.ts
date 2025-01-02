import express from "express";
import index from "./inv/";
import { checkAuth } from "microserivce-common";
const router = express.Router();

// @ts-ignore
router.use("/invoice", index);
export default router;
