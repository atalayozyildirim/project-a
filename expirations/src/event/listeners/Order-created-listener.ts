import {
  BaseConsumer,
  Subject,
  type OrderCreatedEvent,
} from "microserivce-common";
import type { Message, Channel } from "amqplib";
import { expirtationsQueue } from "../../queue/expirationsQueue";

export class OrderCreatedListener extends BaseConsumer<OrderCreatedEvent> {
  Subject: Subject.OrderCreated = Subject.OrderCreated;
  queueGroupName = "expirations-services";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message & Channel) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(`Waiting ${delay} milliseconds to process the job`);

    expirtationsQueue.add({ orderId: data.id }, { delay });
  }
}
