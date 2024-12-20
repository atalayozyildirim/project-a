import express from "express";
import { connectDatabase } from "./src/config/connectDatabase";
import helmet from "helmet";
import router from "./src/routes";
import { checkAuth } from "microserivce-common";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

//@ts-ignore
app.use("/api", checkAuth, router);
app.listen(3000, async () => {
  try {
    await connectDatabase();
    console.log("Server is running on port 3000");
  } catch (err) {
    console.log("Error Server is not running on port 3000");
  }
});
