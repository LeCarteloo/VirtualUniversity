import express from "express"
import { addGraduation, updateGraduation } from "../controllers/graduationController.js"
import { protectUser } from "../middleware/authMiddleware.js"

const graduationRouter = express.Router()

graduationRouter.use(protectUser);

graduationRouter.post("/", addGraduation);
graduationRouter.put("/:id", updateGraduation);


export default graduationRouter;