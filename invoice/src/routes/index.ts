import express from "express";
import index from "./inv/";
const router = express.Router();

// @ts-ignore
router.use("/invoice", index);
export default router;
