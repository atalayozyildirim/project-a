import type { Channel, Message } from "amqplib";
import {
  BaseConsumer,
  Subject,
  type OrderCreatedEvent,
} from "microserivce-common";

export class OrderListener extends BaseConsumer<OrderCreatedEvent> {
  queueGroupName: string = "invoice-service";
  Subject: Subject.OrderCreated = Subject.OrderCreated;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message & Channel) {
    console.log("Event data!", data);
  }
}
