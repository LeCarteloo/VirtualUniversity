import express from "express"
import { addGraduation, getGraduation, getGraduationById, updateGraduation } from "../controllers/graduationController.js"
import { protectUser } from "../middleware/authMiddleware.js"

const graduationRouter = express.Router()

graduationRouter.use(protectUser);

graduationRouter.get("/", getGraduation);
graduationRouter.get("/:userId", getGraduationById);
graduationRouter.post("/", addGraduation);
graduationRouter.put("/:id", updateGraduation);


export default graduationRouter;