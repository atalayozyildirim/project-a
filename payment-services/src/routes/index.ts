import express from "express";
import payment from "./payment/Payment";

const router = express.Router();

router.use("/payment", payment);

export default router;
