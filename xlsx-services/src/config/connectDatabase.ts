import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(Bun.env.MONGO_URI!);

    console.log("Connected to MongoDB Product Server");
  } catch (err) {
    console.log("Error Not connected to MongoDB Product Server");
  }
};
