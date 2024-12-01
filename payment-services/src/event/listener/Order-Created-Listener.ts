import {
  BaseConsumer,
  Subject,
  type OrderCreatedEvent,
} from "microserivce-common";
import type { Message, Channel } from "amqplib";
import { Order } from "../../db/OrderModel";

export class OrderCreatedListener extends BaseConsumer<OrderCreatedEvent> {
  Subject: Subject.OrderCreated = Subject.OrderCreated;
  queueGroupName = "payment-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message & Channel) {
    const isExist = await Order.findOne({ _id: data.id });

    if (isExist) {
      console.log("Order already exists!");
    }

    await Order.create({});
  }
}
