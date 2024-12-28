import {
  BaseConsumer,
  Subject,
  type NotifactionCreatedEvent,
} from "microserivce-common";
import { emailService } from "../../config/MailConfig";

export class NotificationListener extends BaseConsumer<NotifactionCreatedEvent> {
  Subject: Subject.NotifactionCreated = Subject.NotifactionCreated;
  queueGroupName = "notification-service";

  async onMessage(data: NotifactionCreatedEvent["data"]) {
    try {
      console.log("Event data!", data);

      await emailService.connect();

      await emailService.getTransporter().sendMail({
        from: "",
        to: "",
        subject: "You have logged into your account",
        text: data.message,
      });
    } catch (err) {
      console.error("Error processing event");
    }
  }
}
