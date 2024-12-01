import express from "express";
import index from "./order/index";
import { currentUser } from "microserivce-common";
const router = express.Router();

//@ts-ignore
router.use("/order", currentUser, index);

export default router;
