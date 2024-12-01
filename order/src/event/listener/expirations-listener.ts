import {
  BaseConsumer,
  Subject,
  type ExpirationCompleteEvent as ExpirationCompleteEvent,
} from "microserivce-common";
import type { Message, Channel } from "amqplib";
import { Order } from "../../db/OrderModel";

export class ExpiractionListener extends BaseConsumer<ExpirationCompleteEvent> {
  Subject: Subject.ExpirationComplete = Subject.ExpirationComplete;
  queueGroupName = "expiration-service";

  async onMessage(
    data: ExpirationCompleteEvent["data"],
    msg: Message & Channel
  ) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: "cancelled",
      product: null,
    });

    await order.save();
  }
}
