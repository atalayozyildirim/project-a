import express from "express";
import { rabbit } from "./src/config/rabbitmqWrapper";
import { NotificationListener } from "./src/event/listener/notification-listener";

const app = express();

app.listen(3000, async () => {
  try {
    console.log("Attempting to connect to RabbitMQ");
    await rabbit.connect(Bun.env.RABBITMQ_URI!);

    console.log("Listening for events");

    await new NotificationListener(rabbit.client!).listen();

    console.log("Server is running on port 3000");
  } catch (err) {
    console.error("Failed to connect to RabbitMQ:", err);
  }
});
