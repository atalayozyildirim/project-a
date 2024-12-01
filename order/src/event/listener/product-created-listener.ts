import type { Channel, Message } from "amqplib";
import {
  Subject,
  BaseConsumer,
  type ProductCreatedEvent,
} from "microserivce-common";
import { Product } from "../../db/ProductModel";

export class ProductCreatedListener extends BaseConsumer<ProductCreatedEvent> {
  readonly Subject = Subject.ProductCreated;
  queueGroupName = "product-service";

  async onMessage(
    data: ProductCreatedEvent["data"],
    msg: Message & Channel
  ): Promise<void> {
    try {
      const { name, description, price, v } = data;

      const product = await Product.build({
        name,
        description,
        price,
        v,
      });

      await product.save();

      // msg.ack();
    } catch (error) {
      console.log("Error Product Service");
    }
  }
}
