import express from "express";
import ProductRoute from "./product/main";

const router = express.Router();

//@ts-ignore
router.use("/products", ProductRoute);

export default router;
