import type { Message, Channel } from "amqplib";
import {
  BaseConsumer,
  Subject,
  type AuthCreatedEvent,
} from "microserivce-common";

export class AuthLoginCreatedListener extends BaseConsumer<AuthCreatedEvent> {
  Subject: Subject.LoginCreated = Subject.LoginCreated;
  queueGroupName = "auth-services";

  async onMessage(data: AuthCreatedEvent["data"], msg: Message & Channel) {
    try {
    } catch (err) {
      console.error(err);
    }
  }
}
