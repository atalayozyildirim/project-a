import express from "express";
import Employer from "./employer/index";
import { currentUser } from "microserivce-common";

const router = express.Router();
//@ts-ignore
router.use("/emp", currentUser, Employer);

export default router;
