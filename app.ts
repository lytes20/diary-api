import express from "express";
import mongoose from "mongoose";

import AuthRouter from "./routes/auth";

const app = express();

const apiVersion = "v1";

app.use(express.json());
app.use(`/api/${apiVersion}/`, AuthRouter);

async function connectToMongoDB() {
  const url = "mongodb://127.0.0.1:27017/mwa";
  try {
    await mongoose.connect(url);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error connecting to the db");
  }
}

async function main() {
  await connectToMongoDB();
  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
    console.log("http://127.0.01:3030/");
  });
}

main();
