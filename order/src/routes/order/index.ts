import { OrderStatus, Subject } from "microserivce-common";
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";
import { Order } from "../../db/OrderModel.ts";
import { Product } from "../../db/ProductModel.ts";
import { rabbit } from "../../event/RabbitmqWrapper.ts";
import { OrrderCreatedPublisher } from "../../event/publisher/OrderPublisher.ts";

const router = express.Router();

router.get(
  "/:id",
  [param("id").isString().notEmpty()],
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      throw new Error("Bad Request");
    }

    const data = Order.findById(req.params.id);

    if (!data) {
      throw new Error("Order not found");
    }

    res.status(200).json(data);
  }
);

router.post(
  "/add",
  [
    body("productId").isString().notEmpty(),
    body("quantity").isNumeric().notEmpty(),
  ],
  async (req: Request, res: Response) => {
    if (validationResult(req)) {
      throw new Error("Bad Request");
    }

    const { productId } = req.body;

    const product = await Product.findById(productId).exec();

    if (!product) {
      throw new Error("Product not found");
    }

    const isReserved = await product.isReserved();

    if (isReserved) {
      throw new Error("Product is already reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 15 * 60);

    const order = Order.build({
      userId: "req.user.id",
      quantity: req.body.quantity,
      product: product,
      expiresAt: expiration,
      status: OrderStatus.Created,
      v: 0,
    });

    order.save();

    await new OrrderCreatedPublisher(rabbit.client!).publish(
      Subject.OrderCreated,
      {
        id: order.id,
        version: order.v,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        quantity: order.quantity,
        productId: {
          id: product.id,
          name: product.name,
          despcription: product.description,
          price: product.price,
          v: product.v,
        },
      }
    );

    res.status(201).json(order);
  }
);

router.post(
  "/cancel",
  [body("id").isString().notEmpty()],
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      throw new Error("Bad Request");
    }
    const { id } = req.body;

    const order = Order.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    await order.set({ status: OrderStatus.Cancelled });

    res.status(200).json({ message: "Order cancelled" });
  }
);

router.post(
  "/delete/:id",
  [param("id").isString().notEmpty().withMessage("Not valid id")],
  (req: Request, res: Response) => {
    if (!validationResult(req)) {
      throw new Error("Bad Request");
    }
    const { id } = req.body;

    const data = Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Order deleted" });
  }
);

export default router;
