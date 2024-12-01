import { Subject } from "./subject";

export interface OrderCancelledEvent {
  subject: Subject.OrderCancelled;
  data: {
    id: string;
    version: number;
    productID: {
      id: string;
    };
  };
}
