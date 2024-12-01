import mongoose from "mongoose";

export const createDb = async () => {
  try {
    await mongoose.connect(Bun.env.MONGO_URI!);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error");
  }
};
