import express from "express";
import type { Request, Response } from "express";
import { body, validationResult, param, query } from "express-validator";
import { Employer } from "../../db/EmployerModel";

const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  const data = await Employer.find({});

  res.status(200).json({ data });
});

router.get(
  "/search",
  [
    query("s").isString().notEmpty().trim().withMessage("Not valid Query"),
    query("limit").isInt().optional().withMessage("Not valid Limit"),
  ],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      throw new Error("Validation failed");
    }
    const { s, limit } = req.query;

    const data = await Employer.find({
      name: { $regex: s, $options: "i" },
    }).limit(Number(limit) || 10);

    res.status(200).json({ data });
  }
);
router.post(
  "/add",
  [body("name").isString().withMessage("Name is required")],
  [body("surname").isString().withMessage("Surname is required")],
  [body("phoneNumber").isNumeric().withMessage("Phone number is required")],
  [body("Salary").isNumeric().withMessage("Salary is required")],
  [body("email").isEmail().withMessage("Email is required")],
  [body("filed").isString().withMessage("Filed is required")],
  [body("role").isString().withMessage("Role is required")],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      throw new Error("Validation failed");
    }
    const { name, surname, phoneNumber, Salary, email, role, filed } = req.body;
    const empExist = await Employer.findOne({ email });

    if (empExist) {
      throw new Error("Employer already exist");
    }

    const employer = Employer.build({
      name,
      surname,
      phoneNumber,
      Salary,
      email,
      filed,
      role,
    });

    await employer.save();
    res.status(201).json({ message: "Employer added successfully" });
  }
);

router.put(
  "/update/:id",
  [param("id").isMongoId()],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      res.status(400).json({ message: "Invalid id" });
    }

    const { name, surname, phoneNumber, Salary, email, role, filed } = req.body;

    const employer = await Employer.findById(req.params.id);

    if (!employer) {
      throw new Error("Employer not found");
    }

    if (name) employer?.set({ name });
    if (surname) employer?.set({ surname });
    if (role) employer?.set({ role });
    if (phoneNumber) employer?.set({ phoneNumber });
    if (Salary) employer?.set({ Salary });
    if (email) employer?.set({ email });
    if (filed) employer?.set({ filed });

    await employer?.save();

    res.status(200).json({ message: "Employer updated successfully" });
  }
);

router.delete(
  "/delete/:id",
  [param("id").isMongoId().notEmpty().withMessage("Id is required")],
  async (req: Request, res: Response) => {
    if (!validationResult(req)) {
      res.status(400).json({ message: "Invalid id" });
    }

    const employer = await Employer.findById(req.params.id);

    if (!employer) {
      throw new Error("Employer not found");
    }

    await employer?.deleteOne();

    await employer?.save();

    res.status(200).json({ message: "Employer deleted successfully" });
  }
);

export default router;
