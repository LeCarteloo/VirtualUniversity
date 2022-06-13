import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import errorHandler from "../middleware/errorMiddleware.js";

// Routes
import userRouter from "../routes/userRoutes.js";
import subjectRouter from "../routes/subjectRoutes.js";
import courseRouter from "../routes/courseRoutes.js";
import graduationRouter from "../routes/graduationRoutes.js"

// Using the enviroment variables
dotenv.config();

// Connecting to MongoDB
connectDB();

const port = process.env.PORT;
const app = express();

// Parsing bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Adding routes
app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/courses", courseRouter);
app.use("/api/graduation", graduationRouter);


// Overridding default error handler with custom one
app.use(errorHandler);

// Starting the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
