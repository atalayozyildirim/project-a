import type { Channel, Message } from "amqplib";
import {
  Subject,
  BaseConsumer,
  type ProductUpdateEvent,
} from "microserivce-common";
import { Product } from "../../db/ProductModel";

export class ProductUpdatedListener extends BaseConsumer<ProductUpdateEvent> {
  Subject: Subject.ProductUpdated = Subject.ProductUpdated;
  queueGroupName = "product-service";

  async onMessage(
    data: ProductUpdateEvent["data"],
    msg: Message & Channel
  ): Promise<void> {
    try {
      const { name, description, price, v } = data;

      const product = await Product.findById(data.id);

      if (!product) {
        throw new Error("Product not found");
      }

      product.set({ name, description, price, v });

      await product.save();

      // msg.ack();
    } catch (error) {
      console.log("Error Product Service");
    }
  }
}
