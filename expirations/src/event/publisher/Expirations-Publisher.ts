import {
  BasePublisher,
  Subject,
  type ExpirationCompleteEvent,
} from "microserivce-common";

export class ExpirationPublisher extends BasePublisher<ExpirationCompleteEvent> {
  readonly subject = Subject.ExpirationComplete;
}
