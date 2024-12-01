import express from "express";
import type { Request, Response } from "express";
import { Order } from "../../db/OrderModel";
import { Payment } from "../../db/PaymentModel";
import { PaymentCreatedPublisher } from "../../event/publisher/PaymentPublisher";
import { rabbit } from "../../event/rabbitmqWrapper";
import stripe from "../../config/Stripe";
import { body, validationResult } from "express-validator";
import { Subject } from "microserivce-common";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Payment service is up and running" });
});

router.post(
  "/payment",
  [
    body("orderId").not().isEmpty().withMessage("Order Id is required"),
    body("token").not().isEmpty().withMessage("Token is required"),
  ],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      res.status(400).json({ message: validationResult(req).array() });
    }

    const { orderId, token } = req.body;

    const order = await Order.findById({ orderId });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order?.status === "cancelled") {
      res.status(400).json({ message: "Order is already cancelled" });
    }

    const payment = await stripe.charges.create({
      currency: "usd",
      amount: order.quantity * 100,
      source: token,
    });

    const paymentDoc = Payment.build({
      userId: order.userId,
      orderId,
      stripeId: payment.id,
    });

    await paymentDoc.save();

    await new PaymentCreatedPublisher(rabbit.client).publish(
      Subject.PaymentCreated,
      {
        id: paymentDoc.id,
        orderId: paymentDoc.orderId,
        stripeId: paymentDoc.stripeId,
        status: Subject.PaymentSuccsess,
      }
    );

    res.status(201).json({
      message: "Payment successful",
      paymentId: paymentDoc.id,
    });
  }
);

export default router;
