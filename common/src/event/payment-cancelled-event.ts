import type { Subject } from "./subject";

export interface PaymentCancelledEvent {
  subject: Subject.PaymentCancelled;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
    status: string;
    v: number;
  };
}
