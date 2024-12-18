import express from "express";
import { connectDb } from "./src/config/ConenctDb";
import { rabbit } from "./src/event/rabbitmqWrapper";
import router from "./src/routes";
import { checkAuth } from "microserivce-common";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//@ts-ignore
app.use("/api", checkAuth, router);

app.listen(3000, async () => {
  try {
    if (!Bun.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
    if (!Bun.env.RABBITMQ_URI) throw new Error("RABBITMQ_URL must be defined");

    await connectDb();
    await rabbit.connect(Bun.env.RABBITMQ_URI!);

    console.log("Server is running on port 3000");
  } catch (error) {
    console.log("Error starting payment server:", error);
  }
});
