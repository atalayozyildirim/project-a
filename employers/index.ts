import express from "express";
import router from "./src/routes";
import { connectDb } from "./src/db/conenctDb";
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
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

    await connectDb();
    console.log("Server is running on port 3000");
  } catch (error) {
    console.error(error);
  }
});
