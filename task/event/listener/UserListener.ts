import {
  BaseConsumer,
  Subject,
  type UserCreatedEvent,
} from "microserivce-common";
import type { Message, Channel } from "amqplib";
import { User } from "../../src/model/UserModel";

export class UserListener extends BaseConsumer<UserCreatedEvent> {
  Subject: Subject.UserCreated = Subject.UserCreated;
  queueGroupName = "task-user";

  async onMessage(data: UserCreatedEvent["data"], msg: Message & Channel) {
    if (!data) {
      throw new Error("User data is required");
    }

    const user = User.build({
      userId: data.id,
      name: data.name,
      email: data.email,
      task: [],
      role: "",
    });
  }
}
