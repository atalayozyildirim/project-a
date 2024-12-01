import express from "express";
import xlsx from "xlsx";
import multer from "multer";
import { body, validationResult } from "express-validator";
import type { Request, Response } from "express";
import { Process } from "../../db/DataModel"; // Process modelinizi içe aktarın

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  [body("processName").isString().notEmpty()],
  upload.single("file"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { file } = req;
    if (!file) {
      throw new Error("File is required");
    }

    const { processName } = req.body;

    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(sheet);

    const processData = data.map((row: any) => ({
      processName: processName,
      processResult: row,
    }));

    try {
      await Process.insertMany(processData);
      res.status(201).json({ message: "Process completed", data: processData });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  }
);

export default router;
