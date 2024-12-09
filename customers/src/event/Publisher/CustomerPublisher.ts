import {
  BasePublisher,
  Subject,
  type CustomerCreatedEvent,
} from "microserivce-common";

export class CustomerPublisher extends BasePublisher<CustomerCreatedEvent> {
  subject: Subject.CustomerCreated = Subject.CustomerCreated;
}
