import express from "express";
import {
  addAccount,
  deleteUser,
  getAverageGrade,
  getCharges,
  getMyData,
  getMyCourse,
  getMyGrades,
  getUser,
  getUsers,
  getUsersByRole,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  updateCharge,
  updateUser,
  updateContact,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Authentication middleware for all rotues
// userRouter.use(protectUser);

// Adding routes with functions from controller
userRouter.get("/", protectUser, getUsers);

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/refresh", refreshToken);
userRouter.post("/account", protectUser, addAccount);
userRouter.put("/contact", protectUser, updateContact);

userRouter.get("/:email", protectUser, getUser);
userRouter.put("/:id", protectUser, updateUser);
userRouter.delete("/:id", protectUser, deleteUser);

userRouter.get("/grades/me", protectUser, getMyGrades);
userRouter.get("/data/me", protectUser, getMyData);
userRouter.get("/course/me", protectUser, getMyCourse);

userRouter.get("/role/:role", protectUser, getUsersByRole);
userRouter.get("/grades/:userId", protectUser, getAverageGrade);
userRouter.get("/charges/:courseId", protectUser, getCharges);
userRouter.put("/charges/:userId", protectUser, updateCharge);

export default userRouter;
