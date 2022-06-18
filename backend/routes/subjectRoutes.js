import express from "express";
import { getAllSubjects, addSubject, updateSubject, deleteSubject } from "../controllers/subjectController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const subjectRouter = express.Router();

// Using auth middleware in all subject routes
subjectRouter.use(protectUser);

subjectRouter.get("/", getAllSubjects);
subjectRouter.post("/", addSubject);
subjectRouter.put("/:id", updateSubject);
subjectRouter.delete("/:id", deleteSubject);

export default subjectRouter;
