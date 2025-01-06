import {
  BaseConsumer,
  Subject,
  type UserCreatedEmailEvent,
} from "microserivce-common";
import type { Message, Channel } from "amqplib";
import { User } from "../../model/UserModel";

export class UserCreatedListener extends BaseConsumer<UserCreatedEmailEvent> {
  Subject: Subject.UserEmailCreatad = Subject.UserEmailCreatad;
  queueGroupName = "email-service";

  async onMessage(data: UserCreatedEmailEvent["data"], msg: Message & Channel) {
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
