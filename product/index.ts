import express from "express";
import { connectDatabase } from "./src/config/connectDatabase";
import { rabbit } from "./src/events/RabbitMQWrapper";
import router from "./src/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3000, async () => {
  if (!Bun.env.RABBITMQ_URI) console.log("RabbitMQ URI not found");
  if (!Bun.env.MONGO_URI) console.log("Mongo URI not found");
  await connectDatabase();

  await rabbit.connect(Bun.env.RABBITMQ_URI!);

  console.log("Server is running on port 3000");
});
