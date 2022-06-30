import dotenv from "dotenv";
import { connectDB } from "./db.js";
import app from "./app.js";
import errorHandler from "../middleware/errorMiddleware.js";

// Using the enviroment variables
dotenv.config();

// Overridding default error handler with custom one
app.use(errorHandler);

// Connecting to MongoDB
connectDB();

const port = process.env.PORT;

// Starting the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
