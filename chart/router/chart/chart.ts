import express from "express";
import type { Request, Response } from "express";
import { Invoice } from "../../db/InvoiceModel";
const router = express.Router();

router.get("/sales", async (req: Request, res: Response) => {
  try {
    const salesData = await Invoice.aggregate([
      {
        $group: {
          _id: { $month: "$invoiceDate" },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const formmatedData = salesData.map((data) => {
      return {
        month: data._id,
        totalAmount: data.totalAmount,
      };
    });
    res.status(200).json(formmatedData);
  } catch (err) {
    console.log(err);
  }
});

export default router;
