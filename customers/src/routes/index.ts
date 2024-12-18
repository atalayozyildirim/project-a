import express from "express";
import routers from "./customer/customer";

const router = express.Router();

//@ts-ignore
router.use("/customer", routers);

export default router;
