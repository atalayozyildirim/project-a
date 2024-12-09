import mongoose from "mongoose";

export const DbConnect = async () => {
  try {
    await mongoose.connect(Bun.env.MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};
