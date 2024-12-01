import {
  BasePublisher,
  type OrderCreatedEvent,
  Subject,
} from "microserivce-common";

// yalan söleme gözlerim ela bak bu kez ,gözlerime bakkkkkk nasıl oldu gözlerine kandımmmmmmmmmmmmmm

export class OrrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
  subject: Subject.OrderCreated = Subject.OrderCreated;
}
