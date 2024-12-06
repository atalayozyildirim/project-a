import express from "express";

const router = express.Router();

router.get("/sales", (req, res) => {
  res.send("Sales chart");
});

export default router;
