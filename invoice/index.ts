import express from "express";
import router from "./src/routes";
import { connectDB } from "./src/config/connectDB";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3000, async () => {
  try {
    if (!Bun.env.MONGO_URI) console.log("MONGO_URI is not defined");

    await connectDB();
    console.log("Invoice service is up and running");
  } catch (error) {
    console.error(error);
  }
});
