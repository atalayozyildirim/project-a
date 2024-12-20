import express from "express";
import { createConnectionDB } from "./src/config/createDatabase";
import { ProductCreatedListener } from "./src/event/listener/product-created-listener";
import { rabbit } from "./src/event/RabbitmqWrapper";
import { ExpiractionListener } from "./src/event/listener/expirations-listener";
import { ProductUpdatedListener } from "./src/event/listener/product-ticket-updated-listener";
import router from "./src/routes";
import { checkAuth } from "microserivce-common";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//@ts-ignore
app.use("/api", checkAuth, router);

app.listen(3000, async () => {
  try {
    if (!Bun.env.MONGO_URI) console.log("MONGO_URI must be defined");
    if (!Bun.env.RABBITMQ_URL) console.log("RABBITMQ_URL must be defined");

    createConnectionDB();

    await rabbit.connect(Bun.env.RABBITMQ_URL!);

    await new ProductCreatedListener(rabbit.client!).listen();
    await new ExpiractionListener(rabbit.client!).listen();
    await new ProductUpdatedListener(rabbit.client!).listen();

    console.log("Listening on port 3000");
  } catch (error) {
    console.log("Error Product Service", error);
  }
});
