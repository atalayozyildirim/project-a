import type { Channel, Message } from "amqplib";
import {
  BaseConsumer,
  Subject,
  type OrderCreatedEvent,
} from "microserivce-common";
import { Order } from "../../db/OrderModel";
export class OrderListener extends BaseConsumer<OrderCreatedEvent> {
  queueGroupName: string = "invoice-service";
  Subject: Subject.OrderCreated = Subject.OrderCreated;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message & Channel) {
    console.log("Event data!", data);

    if (data.status === "cancelled") {
      //@ts-ignore
      return msg.ack();
    }

    const order = Order.build({
      userId: data.userId,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : new Date(),
      status: data.status,
      v: data.version,
      quantity: data.quantity,
    });
  }
}
