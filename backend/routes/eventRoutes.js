import express from "express";
import { addEvent, getEvents } from "../controllers/eventController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const eventRouter = express.Router();

eventRouter.use(protectUser);

eventRouter.post("/", addEvent);
eventRouter.get("/:courseId", getEvents);


export default eventRouter;