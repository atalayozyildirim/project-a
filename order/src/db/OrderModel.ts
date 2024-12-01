import mongoose from "mongoose";
import { type ProductDoc } from "./ProductModel";
interface OrderAttr {
  userId: string;
  quantity: number;
  product: ProductDoc;
  expiresAt: Date;
  status: string;
  v: number;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  quantity: number;
  product: ProductDoc;
  status: string;
  expiresAt: Date;
  v: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attr: OrderAttr): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
  },
  status: {
    type: String,
    required: true,
  },
  v: {
    type: Number,
    required: true,
  },
});

orderSchema.statics.build = (attr: OrderAttr) => {
  return new Order(attr);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
