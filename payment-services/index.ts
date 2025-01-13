import express from "express";
import { connectDb } from "./src/config/ConenctDb";
import { rabbit } from "./src/event/rabbitmqWrapper";
import router from "./src/routes";
import { checkAuth } from "microserivce-common";
import cookieParser from "cookie-parser";
import { OrderCreatedListener } from "./src/event/listener/Order-Created-Listener";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//@ts-ignore
app.use("/api", checkAuth, router);

app.listen(3000, async () => {
  try {
    if (!Bun.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
    if (!Bun.env.RABBITMQ_URI) throw new Error("RABBITMQ_URL must be defined");

    await connectDb();
    await rabbit.connect(Bun.env.RABBITMQ_URI!);

    await new OrderCreatedListener(rabbit.client).listen();

    console.log("Server is running on port 3000");
  } catch (error) {
    console.log("Error starting payment server:", error);
  }
});
