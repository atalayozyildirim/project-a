import express from "express";
import router from "./router";

const app = express();

app.use("/api", router);
const a = [65, 59, 80, 81, 56, 55, 40];
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
