import express from "express";
import index from "./inv/";
import { AuthCurrentUser } from "microserivce-common";
const router = express.Router();

// @ts-ignore
router.use("/invoice", AuthCurrentUser, index);
export default router;
