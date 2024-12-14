import mongoose from "mongoose";

export default class ConnectionDb {
  public static async connect() {
    try {
      await mongoose.connect(Bun.env.MONGO_URI!);
      console.log("Database connected");
    } catch (error) {
      console.log("Database connection error", error);
    }
  }
}
