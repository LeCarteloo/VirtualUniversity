import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";
import {
  addCharge,
  addCourse,
  deleteCourse,
  getCourses,
  getMySyllabus,
  searchCoruses,
  updateCourse,
} from "../controllers/courseController.js";

const courseRouter = express.Router();
// courseRouter.use(protectUser);

courseRouter.get("/", protectUser, getCourses);
courseRouter.post("/", protectUser, addCourse);
courseRouter.put("/:id", protectUser, updateCourse);
courseRouter.delete("/:id", protectUser, deleteCourse);
courseRouter.get("/me", protectUser, getMySyllabus);
courseRouter.get("/search/:query", protectUser, searchCoruses);
courseRouter.post("/charges/:id", protectUser, addCharge);

export default courseRouter;
