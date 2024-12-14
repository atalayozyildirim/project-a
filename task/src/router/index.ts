import express from "express";
import type { Request, Response } from "express";
import task from "./task/index";

const router = express.Router();

router.use("/task", task);

export default router;
