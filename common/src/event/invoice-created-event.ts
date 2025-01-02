import { Subject } from "./subject";

export interface InvoiceCreatedEvent {
  subject: Subject.InvoiceCreated;
  data: {
    id: string;
    version: number;
    status: string;
    createdDate: Date;
    totalAmount: number;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    invoiceDate: Date;
    dueDate: Date;
    products: Array<any>;
    invoiceNumber: string;
  };
}
