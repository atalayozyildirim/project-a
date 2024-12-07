import mongoose from "mongoose";

interface InvoiceAttr {
  invoiceNumber: string;
  invoiceDate: Date;
  totalAmount: number;
  status: "paid" | "unpaid" | "overdue";
}

interface InvoiceDoc extends mongoose.Document {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  totalAmount: number;
  status: "paid" | "unpaid" | "overdue";
}

interface InvoiceModel extends mongoose.Model<InvoiceDoc> {
  build(attrs: InvoiceAttr): InvoiceDoc;
}

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
});

invoiceSchema.statics.build = (attrs: InvoiceAttr) => {
  return new Invoice(attrs);
};

const Invoice = mongoose.model<InvoiceDoc, InvoiceModel>(
  "Invoice",
  invoiceSchema
);

export { Invoice };
