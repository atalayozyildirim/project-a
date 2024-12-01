import {
  type AuthCreatedEvent,
  Subject,
  BasePublisher,
} from "microserivce-common";

export class AuthPublisherCreated extends BasePublisher<AuthCreatedEvent> {
  subject: Subject.LoginCreated = Subject.LoginCreated;
}
