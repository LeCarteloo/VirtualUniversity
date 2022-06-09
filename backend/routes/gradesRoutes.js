import express from "express";
import { getGrades } from "../controllers/gradesController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const gradeRouter = express.Router();

gradeRouter.use(protectUser);

gradeRouter.get("/", getGrades);

export default gradeRouter;
