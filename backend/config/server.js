import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

// Using the enviroment variables
dotenv.config();

// Connecting to MongoDB
connectDB();

const port = process.env.PORT;
const app = express();

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json("elo");
});
