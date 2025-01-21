import express from "express";
import type { Request, Response } from "express";
import { Invoice } from "../../db/InvoiceModel";
import { Order } from "../../db/OrderModel";
import { Customer } from "../../db/Customer";

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
        value: data.totalAmount,
      };
    });
    res.status(200).json(formmatedData);
  } catch (err) {
    console.log(err);
  }
});
router.get("/home/all", async (req: Request, res: Response) => {
  try {
    const salesData = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);
    const orderData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: "$quantity" },
        },
      },
    ]);
    const customerData = await Customer.aggregate([
      {
        $group: {
          _id: null,
          totalCustomers: { $addToSet: "$email" },
        },
      },
      {
        $project: {
          _id: 1,
          totalCustomers: { $size: "$totalCustomers" },
        },
      },
    ]);

    const formattedData = {
      sales: salesData[0]?.totalAmount || 0,
      orders: orderData[0]?.totalOrders || 0,
      customers: customerData[0]?.totalCustomers || 0,
    };

    res.status(200).json(formattedData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/sales/all/total", async (req: Request, res: Response) => {
  try {
    const salesData = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.status(200).json(salesData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/revenue/drop", async (req: Request, res: Response) => {
  try {
    const revenueData = await Invoice.aggregate([
      {
        $group: {
          _id: { $month: "$invoiceDate" },
          totalRevenue: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedData = revenueData.map((data, index, array) => {
      const previousMonthRevenue =
        index > 0 ? array[index - 1].totalRevenue : 0;
      const revenueDrop = previousMonthRevenue - data.totalRevenue;
      const revenueDropPercentage =
        previousMonthRevenue > 0
          ? (revenueDrop / previousMonthRevenue) * 100
          : 0;

      return {
        month: data._id,
        value: data.totalRevenue,
        revenueDrop,
        revenueDropPercentage,
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/orders", async (req: Request, res: Response) => {
  try {
    const orderData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdDate" },
          totalOrders: { $sum: "$quantity" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const formmatedData = orderData.map((data) => {
      return {
        month: data._id,
        value: data.totalOrders,
      };
    });
    res.status(200).json(formmatedData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/orders/daily", async (req: Request, res: Response) => {
  try {
    const orderData = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfMonth: "$createdDate" },
          totalOrders: { $sum: "$quantity" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedData = orderData.map((data) => {
      return {
        day: data._id,
        value: data.totalOrders,
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/customer/monthly", async (req: Request, res: Response) => {
  try {
    const orderData = await Customer.aggregate([
      {
        $group: {
          _id: { $month: "$createdDate" },
          totalCustomers: { $addToSet: "$email" },
        },
      },
      {
        $project: {
          _id: 1,
          totalCustomers: { $size: "$totalCustomers" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedData = orderData.map((data) => {
      return {
        month: data._id,
        value: data.totalCustomers,
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
