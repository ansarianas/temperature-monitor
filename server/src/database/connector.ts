import mongoose from "mongoose";

const connectDB = async (db_uri: string): Promise<void> => {

  if (db_uri.trim().length === 0) throw new Error("DB URI is empty!");

  if (mongoose.connection.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(db_uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
