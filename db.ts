import mongoose from "mongoose";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error connecting to the db");
  }
}
