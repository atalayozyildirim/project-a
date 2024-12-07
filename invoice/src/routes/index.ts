import express from "express";
import index from "./inv/";
import { currentUser } from "microserivce-common";
const router = express.Router();

// @ts-ignore
router.use("/invoice", currentUser, index);
export default router;
