import express from "express";
import router from "./router";
import { DbConnect } from "./config/DbConnect";
import { rabbit } from "./event/RabbitmqWrapper";
import { OrderListener } from "./event/listener/OrderListener";
import { InvoiceListener } from "./event/listener/invoiceListener";

const app = express();

app.use("/api", router);

app.listen(3000, async () => {
  try {
    // if (!Bun.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
    // if (!Bun.env.RABBITMQ_URI) throw new Error("RABBITMQ_URI is not defined");

    await DbConnect();

    await rabbit.connect(Bun.env.RABBITMQ_URI!);

    await new OrderListener(rabbit.client!).listen();
    await new InvoiceListener(rabbit.client!).listen();

    console.log("Server is running on port 3000");
  } catch (error) {
    console.log("Error starting server");
  }
});
