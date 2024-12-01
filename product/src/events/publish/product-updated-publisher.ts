import {
  BasePublisher,
  Subject,
  type ProductUpdateEvent,
} from "microserivce-common";

export class ProductUpdatedPublisher extends BasePublisher<ProductUpdateEvent> {
  subject: Subject.ProductUpdated = Subject.ProductUpdated;
}
