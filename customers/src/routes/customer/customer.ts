import { Subject } from "microserivce-common";
import express from "express";
import type { Request, Response } from "express";
//@ts-ignore
import { body, validationResult, param } from "express-validator";
import { Customer } from "../../model/Customer";
import { CustomerPublisher } from "../../event/Publisher/CustomerPublisher";
import { rabbit } from "../../event/RabbitMQWrapper";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Kafamdaydın 24 / 7");
});

router.post(
  "/add",
  [
    body("name").isString().trim().notEmpty().isLength({ min: 3, max: 50 }),
    body("surname").isString().trim().notEmpty().isLength({ min: 3, max: 50 }),
    body("company").isString().trim().notEmpty().isLength({ min: 3, max: 50 }),
    body("email").isEmail().normalizeEmail(),
    body("phoneNumber")
      .isString()
      .trim()
      .notEmpty()
      .isLength({ min: 3, max: 16 }),
  ],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      throw new Error("Validation error");
    }

    const { name, surname, email, phoneNumber, company } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      throw new Error("Customer already exists");
    }

    const customer = Customer.build({
      name,
      surname,
      email,
      company,
      phoneNumber,
    });

    await new CustomerPublisher(rabbit.client!).publish(
      Subject.CustomerCreated,
      {
        id: customer.id,
        name: customer.name,
        surname: customer.surname,
        email: customer.email,
        phoneNumber: "null",
      }
    );

    await customer.save();

    res.status(201).json(customer);
  }
);

router.get(
  "/:id",
  [param("id").isMongoId()],
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!validationResult(req)) {
      throw new Error("id is not valid");
    }
    const existingCustomer = await Customer.findById(id);
    if (!existingCustomer) {
      throw new Error("Customer not found");
    }

    res.status(200).json(existingCustomer);
  }
);

router.get(
  "/all/:pages",
  [param("pages").isInt()],
  async (req: Request, res: Response) => {
    const { pages } = req.params;
    if (!validationResult(req)) {
      throw new Error("Page number is not valid");
    }
    const customers = await Customer.find()
      .skip((parseInt(pages) - 1) * 10)
      .limit(15);

    res.status(200).json(customers);
  }
);

export default router;
