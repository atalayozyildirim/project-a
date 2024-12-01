import express from "express";
import ProductRoute from "./product/main";
import { currentUser } from "microserivce-common";

const router = express.Router();

//@ts-ignore
router.use("/products", currentUser, ProductRoute);

export default router;
