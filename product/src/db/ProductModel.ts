import mongoose from "mongoose";

interface ProductAttr {
  name: string;
  price: number;
  description: string;
  orderId: string;
  v: number;
}

export interface ProductDoc extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  orderId: string;
  v: number;
}

export interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attr: ProductAttr): ProductDoc;
}

const productSchema = new mongoose.Schema({
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

productSchema.statics.build = (attr: ProductAttr) => {
  return new Product(attr);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product };
