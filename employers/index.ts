import express from "express";
import router from "./src/routes";
import { connectDb } from "./src/db/conenctDb";

const app = express();

app.use("/api", router);

app.listen(3000, async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

    await connectDb();
    console.log("Server is running on port 3000");
  } catch (error) {
    console.error(error);
  }
});
