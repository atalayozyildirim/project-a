import {
  BaseConsumer,
  Subject,
  type OrderCancelledEvent,
} from "microserivce-common";
import type { Message } from "amqplib";
import { Product } from "../../db/ProductModel";
import { ProductUpdatedPublisher } from "../publish/product-updated-publisher";

export class OrderUpdateListener extends BaseConsumer<OrderCancelledEvent> {
  Subject: Subject.OrderCancelled = Subject.OrderCancelled;
  queueGroupName = "order-service";

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const product = await Product.findById(data.productID.id);

    if (!product) {
      throw new Error("Product not found");
    }

    product.set({ orderId: Subject.OrderCancelled });

    await product.save();

    // @ts-ignore
    await new ProductUpdatedPublisher(this.client).publish(
      Subject.ProductUpdated,
      {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        v: product.v,
      }
    );
  }
}
