import express from "express";
import errorHandler from "../middleware/errorMiddleware.js";

// Routes
import userRouter from "../routes/userRoutes.js";
import subjectRouter from "../routes/subjectRoutes.js";
import courseRouter from "../routes/courseRoutes.js";
import graduationRouter from "../routes/graduationRoutes.js"
import eventRouter from "../routes/eventRoutes.js"

const app = express();

// Parsing bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Overridding default error handler with custom one
app.use(errorHandler);

// Adding routes
app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/courses", courseRouter);
app.use("/api/graduation", graduationRouter);
app.use("/api/events", eventRouter);


export default app;