import {
  BaseConsumer,
  Subject,
  type OrderCancelledEvent,
} from "microserivce-common";
import type { Message, Channel } from "amqplib";

export class OrderCancelledListener extends BaseConsumer<OrderCancelledEvent> {
  Subject: Subject.OrderCancelled = Subject.OrderCancelled;
  queueGroupName = "payment-service";

  onMessage(data: OrderCancelledEvent["data"], msg: Message & Channel) {
    console.log("Event data!", data);
  }
}
