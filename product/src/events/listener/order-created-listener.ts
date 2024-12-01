import {
  BaseConsumer,
  Subject,
  type OrderCreatedEvent,
} from "microserivce-common";
import type { Message } from "amqplib";
import { Product } from "../../db/ProductModel";
import { ProductUpdatedPublisher } from "../publish/product-updated-publisher";

export class OrderCreatedListener extends BaseConsumer<OrderCreatedEvent> {
  Subject: Subject.OrderCreated = Subject.OrderCreated;
  queueGroupName = "order-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const product = await Product.findById(data.productId.id);

    if (!product) {
      throw new Error("Product not found");
    }

    product.set({ orderId: data.id });

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
