import amqplib from "amqplib";

class RabbitMQWrapper {
  private _client?: amqplib.Connection;
  private _channel?: amqplib.Channel;
  private _url?: string;
  private _retries?: number;
  private _delay?: number;

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
    this._url = url;
    this._retries = retries;
    this._delay = delay;
    for (let i = 0; i < retries; i++) {
      try {
        console.log("Attempting to connect to RabbitMQ");
        this._client = await amqplib.connect(url);

        this._client.on("close", () => {
          console.error(
            "RabbitMQ connection closed, attempting to reconnect..."
          );
          this.reconnect();
        });

        this._client.on("error", (err) => {
          console.error("RabbitMQ connection error:", err);
          this.reconnect();
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
        }
      }
    }
  }

  private async reconnect() {
    if (this._url && this._retries && this._delay) {
      await this.connect(this._url, this._retries, this._delay);
    }
  }
}

const rabbit = new RabbitMQWrapper();

export { RabbitMQWrapper, rabbit };
