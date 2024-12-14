import express from "express";
import { connectDb } from "./config/connectDb";
import router from "./src/routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3000, async () => {
  try {
    if (Bun.env.MONGO_URI) throw new Error("MONGO_URI not found");

    await connectDb();

    console.log("Server is running on port 3000");
  } catch (error) {
    console.log("Error starting server", error);
  }
});