import express from "express";
import index from "./xlsx";
const router = express.Router();

router.use("/xlsx", index);

export default router;
