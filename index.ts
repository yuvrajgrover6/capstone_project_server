import express, { type Express, type Request, type Response } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const envPath = path.join(__dirname, "../.env");
dotenv.config({ path: envPath });

const app: Express = express();
const port = process.env.PORT || 3000;
const mongoId = process.env.MONGO_ID;
const mongoPassword = process.env.MONGO_PASS || "";
const encodedPassword = encodeURIComponent(mongoPassword);

app.use(cors());

const url = `mongodb://localhost:27017/capstone`;

mongoose.connect(url, {
  user: mongoId,
  pass: encodedPassword,
  connectTimeoutMS: 30000,
});

const mongodbDB = mongoose.connection;

mongodbDB.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongodbDB.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export { mongodbDB };
