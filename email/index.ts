import cookieParser from "cookie-parser";
import express from "express";
import { connectDb } from "./config/connectDb";
import router from "./src/routes";
import { rabbit } from "./event/rabbitmqWrapper";
import { UserCreatedListener } from "./event/listener/user-created-listener";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//@ts-ignore
app.use("/api", router);

app.listen(3000, async () => {
  try {
    if (!Bun.env.MONGO_URI) throw new Error("MONGO_URI not found");
    if (!Bun.env.RABBITMQ_URI) throw new Error("RABBITMQ_URI not found");

    await rabbit.connect(Bun.env.RABBITMQ_URI!);
    await connectDb();

    await new UserCreatedListener(rabbit.client).listen();

    console.log("Email server is running on port 3000");
  } catch (error) {
    console.log("Error starting server", error);
  }
});
