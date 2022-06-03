import express from "express";
import { addSubject } from "../controllers/subjectController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const subjectRouter = express.Router();

// Using auth middleware in all subject routes
subjectRouter.use(protectUser);

subjectRouter.post("/", addSubject);

export default subjectRouter;
