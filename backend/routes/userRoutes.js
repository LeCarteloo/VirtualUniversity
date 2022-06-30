import express from "express";
import {
  addAccount,
  getAverageGrade,
  getCharges,
  getUser,
  getUsers,
  getUsersByRole,
  loginUser,
  registerUser,
  updateCharge,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Authentication middleware for all rotues
// userRouter.use(protectUser);

// Adding routes with functions from controller
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", protectUser, getUsers);
userRouter.get("/:email", protectUser, getUser);
userRouter.get("/role/:role", protectUser, getUsersByRole);
userRouter.get("/grades/:userId", protectUser, getAverageGrade);
userRouter.get("/charges/:courseId", protectUser, getCharges);
userRouter.put("/account", protectUser, addAccount);
userRouter.put("/charges/:userId", protectUser, updateCharge);

export default userRouter;
