import express from "express";
import {
  addEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const eventRouter = express.Router();

// eventRouter.use(protectUser);

eventRouter.post("/", protectUser, addEvent);
eventRouter.get("/:courseId", protectUser, getEvents);
eventRouter.put("/:id", protectUser, updateEvent);

export default eventRouter;
