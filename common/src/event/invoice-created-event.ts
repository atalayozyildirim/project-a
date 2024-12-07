import { Subject } from "./subject";

export interface InvoiceCreatedEvent {
  subject: Subject.InvoiceCreated;
  data: {
    id: string;
    version: number;
    status: string;
    userId: string;
    expiresAt: string;
    totalAmount: number;
    products: {
      id: string;
      quantity: number;
      price: number;
    }[];
  };
}
