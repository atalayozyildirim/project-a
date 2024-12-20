import express, { urlencoded } from "express";
import router from "./router";
import { DbConnect } from "./config/DbConnect";
import { rabbit } from "./event/RabbitmqWrapper";
import { OrderListener } from "./event/listener/OrderListener";
import { InvoiceListener } from "./event/listener/invoiceListener";
import { CustomerListener } from "./event/listener/CustomerListeners";
import { checkAuth } from "microserivce-common";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//@ts-ignore
app.use("/api", checkAuth, router);

app.listen(3000, async () => {
  try {
    if (!Bun.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
    if (!Bun.env.RABBITMQ_URI) throw new Error("RABBITMQ_URI is not defined");

    await DbConnect();

    await rabbit.connect(Bun.env.RABBITMQ_URI!);

    await new OrderListener(rabbit.client!).listen();
    await new InvoiceListener(rabbit.client!).listen();
    await new CustomerListener(rabbit.client!).listen();

    console.log("Server is running on port 3000");
  } catch (error) {
    console.log("Error starting server");
  }
});
