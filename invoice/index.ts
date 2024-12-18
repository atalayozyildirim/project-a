import express from "express";
import router from "./src/routes";
import { connectDB } from "./src/config/connectDB";
import { checkAuth } from "microserivce-common";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//@ts-ignore
app.use("/api", checkAuth, router);

app.listen(3000, async () => {
  try {
    if (!Bun.env.MONGO_URI) console.log("MONGO_URI is not defined");

    await connectDB();
    console.log("Invoice service is up and running");
  } catch (error) {
    console.error(error);
  }
});
