import { Subject } from "./subject.ts";
import amqplib from "amqplib";

interface Event {
  subject: string;
  data: any;
}

export abstract class BasePublisher<T extends Event> {
  abstract subject: T["subject"];
  private client: amqplib.Connection;

  constructor(client: amqplib.Connection) {
    this.client = client;
  }

  async publish(subject: T["subject"], data: T["data"]) {
    const channel = await this.client.createChannel();
    await channel.assertQueue(subject, { durable: true });
    channel.sendToQueue(subject, Buffer.from(JSON.stringify(data)));
    console.log(`Message published to subject ${subject}`);
  }
}
