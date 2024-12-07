import {
  BasePublisher,
  Subject,
  type InvoiceCreatedEvent,
} from "microserivce-common";

export class InvoicePublisher extends BasePublisher<InvoiceCreatedEvent> {
  subject: Subject.InvoiceCreated = Subject.InvoiceCreated;
}
