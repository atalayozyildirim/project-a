import { Subject } from "./subject";

export interface InvoiceCreatedEvent {
  subject: Subject.InvoiceCreated;
  data: {
    id: string;
    version: number;
    status: string;
    createdDate: Date;
    totalAmount: number;
  };
}
