import {
  BasePublisher,
  Subject,
  type PaymentCreatedEvent,
} from "microserivce-common";

export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent> {
  subject: Subject.PaymentCreated = Subject.PaymentCreated;
}
