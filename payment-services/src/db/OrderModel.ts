import mongoose from "mongoose";
import { OrderStatus } from "microserivce-common";

interface OrderAttr {
  userId: string;
  quantity: number;
  expiresAt: Date;
  status: OrderStatus;
  v: number;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  quantity: number;
  expiresAt: Date;
  status: OrderStatus;
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
    type: OrderStatus,
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
