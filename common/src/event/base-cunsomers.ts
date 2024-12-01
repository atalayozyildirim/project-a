import amqlib, { type Message, type Channel } from "amqplib";

interface Event {
  subject: string;
  data: any;
}

export abstract class BaseConsumer<T extends Event> {
  abstract Subject: T["subject"];
  abstract queueGroupName: string;
  private client;
  abstract onMessage(data: T["data"], msg: Message): void;
  protected ackWait = 5 * 1000;

  /**
   *
   */
  constructor(client: amqlib.Connection) {
    this.client = client;
  }

  async connect() {
    try {
      const connection = await amqlib.connect(process.env.RABBITMQ_URL!);
      console.log("Connected to RabbitMQ");
    } catch (error) {
      console.log("Error connecting to RabbitMQ");
    }
  }

  async listen() {
    const channel = await this.client.createChannel();
    await channel.assertQueue(this.Subject, { durable: true });

    channel.consume(
      this.Subject,
      (msg) => {
        if (msg) {
          console.log(`Message received: ${msg.content.toString()}`);
          const parsedMessage = JSON.parse(msg.content.toString());
          this.onMessage(parsedMessage.data, parsedMessage);
        }
      },
      { noAck: false }
    );
  }
  parseMessage(msg: Message) {
    const data = msg.content.toString();
    return JSON.parse(data);
  }
}
