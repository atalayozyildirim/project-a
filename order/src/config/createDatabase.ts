import mongoose from "mongoose";

export const createConnectionDB = async () => {
  try {
    await mongoose.connect(Bun.env.MONGO_URI!);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database");
  }
};
