import express from "express";
import type { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { Invoice } from "../../db/invocieModel";
import { InvoicePublisher } from "../../event/publiher/InvoicePublisher";
import { rabbit } from "../../event/RabbitmqWrapper";
import { Subject } from "microserivce-common";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Invoice service is up and running" });
});

router.post(
  "/add",
  [
    body("inoviceNumber")
      .isString()
      .notEmpty()
      .withMessage("Invoice number is required"),
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
      throw new Error("Validation failed");
    }

    const invoiceExists = Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber,
    });
    if (!invoiceExists) {
      throw new Error("Invoice already exists");
    }

    const invoice = Invoice.build(req.body);

    invoice.save();

    await new InvoicePublisher(rabbit.client!).publish(Subject.InvoiceCreated, {
      id: invoice.id,
      createdDate: invoice.invoiceDate,
      totalAmount: invoice.totalAmount,
      version: 3,
      status: invoice.status,
    });

    res.json({ message: "Invoice added", data: invoice });
  }
);
router.get(
  "/all/:page",
  [param("page").isNumeric().withMessage("Not valid page")],
  (req: Request, res: Response) => {
    if (!validationResult(req)) throw new Error("Validation failed");

    const data = Invoice.find({})
      .skip((parseInt(req.params.page) - 1) * 10)
      .limit(10);

    res.status(200).json(data);
  }
);
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Not valid id")],
  (req: Request, res: Response) => {
    if (!validationResult(req)) {
      throw new Error("Validation failed");
    }

    const invoice = Invoice.findById(req.params.id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    res.json({ message: "Succsess", data: invoice });
  }
);

router.get("/all", (req: Request, res: Response) => {
  const invoices = Invoice.find({});
  res.json({ invoices });
});

export default router;
