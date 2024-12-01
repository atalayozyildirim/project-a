import mongoose from "mongoose";

interface InvoiceAttr {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  invoiceDate: Date;
  dueDate: Date;
  products: [
    {
      name: { type: String; required: true };
      quantity: { type: Number; required: true };
      price: { type: Number; required: true };
    }
  ];
  totalAmount: number;
  status: "paid" | "unpaid" | "overdue";
}

interface InvoiceDoc extends mongoose.Document {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  invoiceDate: Date;
  dueDate: Date;
  products: [
    {
      name: { type: String; required: true };
      quantity: { type: Number; required: true };
      price: { type: Number; required: true };
    }
  ];
  totalAmount: number;
  status: "paid" | "unpaid" | "overdue";
}

interface InvoiceModel extends mongoose.Model<InvoiceDoc> {
  build(attrs: InvoiceAttr): InvoiceDoc;
}

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

invoiceSchema.statics.build = (attrs: InvoiceAttr) => {
  return new Invoice(attrs);
};

const Invoice = mongoose.model<InvoiceDoc, InvoiceModel>(
  "Invoice",
  invoiceSchema
);

export { Invoice };
