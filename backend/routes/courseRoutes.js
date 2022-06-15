import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";
import { addCharge, addCourse } from "../controllers/courseController.js";

const courseRouter = express.Router();
courseRouter.use(protectUser);

courseRouter.post("/", addCourse);
courseRouter.post("/charges/:id", addCharge);

export default courseRouter;
