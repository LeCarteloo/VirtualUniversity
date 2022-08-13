import express from "express";
import {
  getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
  searchSubjects,
} from "../controllers/subjectController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const subjectRouter = express.Router();

// Using auth middleware in all subject routes
// subjectRouter.use(protectUser);

subjectRouter.get("/", protectUser, getAllSubjects);
subjectRouter.post("/", protectUser, addSubject);
subjectRouter.get("/search/:query", protectUser, searchSubjects);
subjectRouter.put("/:id", protectUser, updateSubject);
subjectRouter.delete("/:id", protectUser, deleteSubject);

export default subjectRouter;
