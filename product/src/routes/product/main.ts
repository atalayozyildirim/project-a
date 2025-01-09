import express from "express";
import type { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { Product } from "../../db/ProductModel";
import { ProductCreatedPublisher } from "../../events/publish/ProductPublisher";
import { rabbit } from "../../events/RabbitMQWrapper";
import { Subject } from "microserivce-common";
import { ProductUpdatedPublisher } from "../../events/publish/product-updated-publisher";
import crypto from "crypto";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Product service is running" });
});

router.get(
  "/all/:limit",
  [param("limit").isNumeric().notEmpty().withMessage("Not valid params !")],
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      throw new Error("Validation error");
    }

    const { limit } = req.params;

    const data = await Product.find({}).skip(0).limit(parseInt(limit));

    res.status(200).json(data);
  }
);

router.get("/:id", [param("id")], async (req: Request, res: Response) => {
  console.log(req.session);
  if (!validationResult(req).isEmpty()) {
    throw new Error("Validation error");
  }

  const { id } = req.params;

  const data = await Product.findById(id);

  if (!data) {
    throw new Error("Product not found");
  }

  res.status(200).json(data);
});

router.post(
  "/add",
  [
    body("name").isString().notEmpty().withMessage("Not valid !"),
    body("price").isNumeric().notEmpty().withMessage("Not valid !"),
    body("description").isString().notEmpty().withMessage("Not valid !"),
    body("v").isNumeric().notEmpty().withMessage("Not valid !"),
  ],
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      throw new Error("Validation error");
    }
    const { name, price, description, v } = req.body;

    const orderId = crypto.randomBytes(16).toString("hex");

    const data = Product.build({
      name,
      price,
      description,
      orderId,
      v,
    });

    await data.save();

    await new ProductCreatedPublisher(rabbit.client!).publish(
      Subject.ProductCreated,
      {
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description,
        v: data.v,
      }
    );

    res.status(201).send(data);
  }
);

router.post(
  "/update",
  [
    body("name").isString().notEmpty().withMessage("Not valid  name!"),
    body("price").isNumeric().notEmpty().withMessage("Not valid  price!"),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Not valid  descrpiton!"),
    body("id").isString().notEmpty().withMessage("Not valid id!"),
  ],
  async (req: Request, res: Response) => {
    const { id, name, price, description } = req.body;

    const finProduct = await Product.findById(id);

    if (!finProduct) {
      throw new Error("Product not found");
    }

    if (name) {
      finProduct.set({ name });
    } else if (price) {
      finProduct.set({ price });
    } else if (description) {
      finProduct.set({ description });
    } else {
      finProduct.set({ name, price, description });
    }

    await finProduct.save();

    await new ProductUpdatedPublisher(rabbit.client!).publish(
      Subject.ProductUpdated,
      {
        id: finProduct.id,
        name: finProduct.name,
        price: finProduct.price,
        description: finProduct.description,
        v: finProduct.v,
      }
    );

    res.status(200).json({ message: "Product updated" });
  }
);

router.post(
  "/delete/:id",
  [param("id").isMongoId().notEmpty().withMessage("Not valid !")],
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      throw new Error("Validation error");
    }

    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted" });
  }
);

export default router;
