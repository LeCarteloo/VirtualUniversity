import express from "express";
import {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const eventRouter = express.Router();

// eventRouter.use(protectUser);

eventRouter.post("/", protectUser, addEvent);
eventRouter.get("/:courseId", protectUser, getEvents);
eventRouter.put("/:id", protectUser, updateEvent);
eventRouter.delete("/:id", protectUser, deleteEvent);

export default eventRouter;
