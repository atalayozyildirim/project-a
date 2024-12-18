import express from "express";
import index from "./order/index";
const router = express.Router();

//@ts-ignore
router.use("/order", index);

export default router;
