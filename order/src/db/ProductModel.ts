import mongoose from "mongoose";
import { Order } from "./OrderModel.ts";
import { OrderStatus } from "microserivce-common";

interface ProductAttr {
  productId: string;
  name: string;
  price: number;
  description: string;
  v: number;
}

export interface ProductDoc extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  v: number;
  isReserved(): Promise<boolean>;
}

export interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attr: ProductAttr): ProductDoc;
}

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  v: { type: Number, required: true },
});

productSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

productSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};
productSchema.statics.build = (attr: ProductAttr) => {
  return new Product(attr);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product };
