import express from "express";
import { rabbit } from "./src/event/rabbitmqWrapper";
import { OrderCreatedListener } from "./src/event/listeners/Order-created-listener";

const app = express();

app.listen(3000, async () => {
  console.log("Server is running on port 3000");

  await rabbit.connect(Bun.env.RABBITMQ_URI!);

  new OrderCreatedListener(rabbit.client!).listen();

  console.log("Listening for events");
});
