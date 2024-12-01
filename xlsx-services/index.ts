import express from "express";
import { connectDatabase } from "./src/config/connectDatabase";
import helmet from "helmet";
import router from "./src/routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api", router);
app.listen(3000, async () => {
  try {
    await connectDatabase();
    console.log("Server is running on port 3000");
  } catch (err) {
    console.log("Error Server is not running on port 3000");
  }
});
