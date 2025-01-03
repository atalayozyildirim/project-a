import {
  BasePublisher,
  Subject,
  type UserCreatedEvent,
} from "microserivce-common";

export class UserPublisherCreated extends BasePublisher<UserCreatedEvent> {
  subject: Subject.UserCreated = Subject.UserCreated;
}
