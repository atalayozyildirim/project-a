import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(Bun.env.MONGO_URI!);
    console.log("Connected to payment DB");
  } catch (err) {
    console.log(err);
  }
};
