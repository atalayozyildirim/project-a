import express from "express";
import router from "./routes";
import { createDb } from "./db/createDb";
import { checkAuth, sanitizeMiddleware } from "microserivce-common";
import cookieParser from "cookie-parser";
import { rabbit } from "./event/RabbitMQWrapper";

const app = express();

app.use(sanitizeMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//@ts-ignore
app.use("/api", checkAuth, router);

app.listen(3000, async () => {
  try {
    if (!Bun.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    if (!Bun.env.RABBITMQ_URI) {
      throw new Error("RABBITMQ_URI is not defined");
    }
    createDb();
    await rabbit.connect(Bun.env.RABBITMQ_URI!);

    console.log("Server is running on port 3000");
  } catch (error) {
    console.log(error);
  }
});
