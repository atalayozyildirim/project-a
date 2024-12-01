import {
  BaseConsumer,
  BasePublisher,
  Subject,
  type NotifactionCreatedEvent,
} from "microserivce-common";

export class NotificationsPublisher extends BasePublisher<NotifactionCreatedEvent> {
  subject: Subject.NotifactionCreated = Subject.NotifactionCreated;
}
