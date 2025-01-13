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

    const res = await Order.build({
      orderId: data.id,
      userId: data.userId,
      quantity: data.quantity,
      expiresAt: new Date(data.expiresAt),
      status: data.status,
      v: data.version,
    });

    await res.save();

    console.log("Order created!", res);
  }
}
