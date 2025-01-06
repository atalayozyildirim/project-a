import {
  BaseConsumer,
  Subject,
  type UserCreatedEvent,
} from "microserivce-common";
import type { Message, Channel } from "amqplib";
import { User } from "../../model/UserModel";

export class UserCreatedListener extends BaseConsumer<UserCreatedEvent> {
  Subject: Subject.UserCreated = Subject.UserCreated;
  queueGroupName = "email-service";

  async onMessage(data: UserCreatedEvent["data"], msg: Message & Channel) {
    if (!data) {
      throw new Error("User data is required");
    }

    await User.build({
      email: data.email,
      name: data.name,
      role: "user",
      userId: data.id,
      task: [],
    }).save();
  }
}
