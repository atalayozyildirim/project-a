import express from "express";
import router from "./routes";
import { createDb } from "./db/createDb";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3000, () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    createDb();
    console.log("Server is running on port 3000");
  } catch (error) {
    console.log(error);
  }
});
