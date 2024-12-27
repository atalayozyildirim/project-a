import amqplib from "amqplib";
import e from "express";

class RabbitMQWrapper {
  private _client?: amqplib.Connection;
  private _channel?: amqplib.Channel;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access RabbitMQ client before connecting");
    }
    return this._client;
  }

  get channel() {
    if (!this._channel) {
      throw new Error("Cannot access RabbitMQ channel before connecting");
    }
    return this._channel;
  }

  async connect(url: string, retries = 5, delay = 5000) {
    for (let i = 0; i < retries; i++) {
      try {
        console.log("Attempting to connect to RabbitMQ");
        this._client = await amqplib.connect(url);

        this._client.on("close", () => {
          console.error("RabbitMQ connection closed");
          process.exit(1);
        });

        this._client.on("error", (err) => {
          console.error("RabbitMQ connection error:", err);
          process.exit(1);
        });

        this._channel = await this._client.createChannel();
        console.log("Connected to RabbitMQ");
        return;
      } catch (err) {
        console.error(
          `Failed to connect to RabbitMQ (attempt ${i + 1} of ${retries}):`,
          err
        );
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.log("Failed to connect to RabbitMQ, exiting...");
          process.exit(1);
        }
      }
    }
  }
}

const rabbit = new RabbitMQWrapper();

export { RabbitMQWrapper, rabbit };
