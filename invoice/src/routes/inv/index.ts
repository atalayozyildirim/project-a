import express from "express";
import type { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";
import Invoice from "../../db/invocieModel";
import { InvoicePublisher } from "../../event/publiher/InvoicePublisher";
import crypto from "crypto";
import { rabbit } from "../../event/RabbitmqWrapper";
import { Subject } from "microserivce-common";

const router = express.Router();

router.post(
  "/add",
  [
    body("customerName")
      .isString()
      .notEmpty()
      .withMessage("Customer name is required"),
    body("customerEmail").isEmail().withMessage("Invalid email"),
    body("customerAddress")
      .isString()
      .notEmpty()
      .withMessage("Address is required"),
    body("invoiceDate").isDate().withMessage("Invalid date"),
    body("dueDate").isDate().withMessage("Invalid date"),
    body("products").isArray().notEmpty().withMessage("Products are required"),
    body("totalAmount")
      .isNumeric()
      .notEmpty()
      .withMessage("Total amount is required"),
    body("status").isString().notEmpty().withMessage("Status is required"),
  ],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      throw new Error("Invalid input");
    }

    const invoiceExists = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber,
    });
    if (invoiceExists) {
      throw new Error("Invoice number already exists");
    }

    const randomUniqueNumber = crypto.randomBytes(4).toString("hex");

    req.body.invoiceNumber = randomUniqueNumber;
    req.body.status = "pending";

    const invoice = new Invoice(req.body);

    await invoice.save();

    await new InvoicePublisher(rabbit.client!).publish(Subject.InvoiceCreated, {
      id: invoice.id,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      customerAddress: invoice.customerAddress,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      products: invoice.products,
      totalAmount: invoice.totalAmount,
      status: invoice.status,
      invoiceNumber: invoice.invoiceNumber,
      version: 0,
      createdDate: new Date(),
    });

    res.status(201).json(invoice);
  }
);
router.get(
  "/:id",
  [param("id").isMongoId().notEmpty().withMessage("Not valid params")],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      throw new Error("Invalid input");
    }
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    res.status(200).json(invoice);
  }
);

router.get(
  "/all/:page",
  [
    param("page")
      .isString()
      .notEmpty()
      .default(1)
      .withMessage("Not valid page params"),
  ],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      throw new Error("Invalid page number");
    }

    const invoices = await Invoice.find({})
      .skip((parseInt(req.params.page) - 1) * 10)
      .limit(10);
    res.status(200).json(invoices);
  }
);
export default router;
