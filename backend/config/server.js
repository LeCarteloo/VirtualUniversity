import dotenv from "dotenv";
import { connectDB } from "./db.js";
import app from "./app.js"

// Using the enviroment variables
dotenv.config();

// Connecting to MongoDB
connectDB();

const port = process.env.PORT;

// Starting the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

