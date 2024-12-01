import express from "express";
import routers from "./customer/customer";
import { currentUser } from "microserivce-common";

const router = express.Router();

//@ts-ignore
router.use("/customer", currentUser, routers);

export default router;
