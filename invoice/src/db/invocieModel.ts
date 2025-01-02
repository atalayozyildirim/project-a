import mongoose, { Schema, Document } from "mongoose";

interface IInvoice extends Document {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  invoiceDate: Date;
  dueDate: Date;
  products: Array<any>;
  totalAmount: number;
  status: "paid" | "unpaid" | "overdue";
  invoiceNumber: string;
}

const InvoiceSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  products: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
  invoiceNumber: { type: String, required: true, unique: true },
});

InvoiceSchema.pre<IInvoice>("save", function (next) {
  if (!this.invoiceNumber) {
    this.invoiceNumber = `INV-${Date.now()}`;
  }
  next();
});

const Invoice = mongoose.model<IInvoice>("Invoice", InvoiceSchema);

export default Invoice;
