import express from "express";
import errorHandler from "../middleware/errorMiddleware.js";

// Routes
import userRouter from "../routes/userRoutes.js";
import subjectRouter from "../routes/subjectRoutes.js";
import courseRouter from "../routes/courseRoutes.js";
import graduationRouter from "../routes/graduationRoutes.js";
import eventRouter from "../routes/eventRoutes.js";

const app = express();

// Allowing cross origin (for testing on localhost)
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*, authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
};

// Parsing bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.cookieParser());
app.use(allowCrossDomain);

// Overridding default error handler with custom one
app.use(errorHandler);

// Adding routes
app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/courses", courseRouter);
app.use("/api/graduation", graduationRouter);
app.use("/api/events", eventRouter);

export default app;
