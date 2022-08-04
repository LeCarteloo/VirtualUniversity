import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";
import {
  addCharge,
  addCourse,
  getCourses,
  getMySyllabus,
} from "../controllers/courseController.js";

const courseRouter = express.Router();
// courseRouter.use(protectUser);

courseRouter.get("/", protectUser, getCourses);
courseRouter.get("/me", protectUser, getMySyllabus);
courseRouter.post("/", protectUser, addCourse);
courseRouter.post("/charges/:id", protectUser, addCharge);

export default courseRouter;
