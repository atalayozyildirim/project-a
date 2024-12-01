import {
  BasePublisher,
  Subject,
  type ProductCreatedEvent,
} from "microserivce-common";

export class ProductCreatedPublisher extends BasePublisher<ProductCreatedEvent> {
  subject: Subject.ProductCreated = Subject.ProductCreated;
}
