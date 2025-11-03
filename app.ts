import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth";
import DiaryRouter from "./routes/diary";
import AuthMiddleware from "./middleware/auth";
import { connectToMongoDB } from "./db";
import { errorHandler, routerNotFoundHandler } from "./utils/common";

const app = express();

const apiVersion = "v1";

app.use(cors());
app.use(express.json());
app.use(`/api/${apiVersion}`, AuthRouter);
app.use(`/api/${apiVersion}/diary`, AuthMiddleware.checkToken, DiaryRouter);

app.use(routerNotFoundHandler);
app.use(errorHandler);

async function main() {
  await connectToMongoDB();
  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
    console.log("http://127.0.01:3030/");
  });
}

main();
