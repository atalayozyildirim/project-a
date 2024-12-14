import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(Bun.env.MONGO_URI!);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
