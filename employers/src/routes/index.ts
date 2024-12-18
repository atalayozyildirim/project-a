import express from "express";
import Employer from "./employer/index";

const router = express.Router();
//@ts-ignore
router.use("/emp", Employer);

export default router;
