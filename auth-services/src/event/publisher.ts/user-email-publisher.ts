import {
  BasePublisher,
  Subject,
  type UserCreatedEmailEvent,
} from "microserivce-common";

export class UserPublisherEmailCreated extends BasePublisher<UserCreatedEmailEvent> {
  subject: Subject.UserEmailCreatad = Subject.UserEmailCreatad;
}
