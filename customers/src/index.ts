import express from "express";
import router from "./routes";
import { createDb } from "./db/createDb";
import { checkAuth } from "microserivce-common";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//@ts-ignore
app.use("/api", checkAuth, router);

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
