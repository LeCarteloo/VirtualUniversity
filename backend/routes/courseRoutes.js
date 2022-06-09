import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";
import { addCourse } from "../controllers/courseController.js";

const courseRouter = express.Router();
courseRouter.use(protectUser);

courseRouter.post("/", addCourse);

export default courseRouter;
