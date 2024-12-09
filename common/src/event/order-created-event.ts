import { Subject } from "./subject";

export interface OrderCreatedEvent {
  subject: Subject.OrderCreated;
  data: {
    id: string;
    version: number;
    status: string;
    userId: string;
    quantity: number;
    expiresAt: string;
    productId: {
      id: string;
      name: string;
      despcription: string;
      price: number;
      v: number;
    };
  };
}
