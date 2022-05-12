import express from "express";
import {
  addUser,
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Authentication middlewear
// userRouter.use(protectUser);

// Adding routes with functions from controller
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", protectUser, getUsers);
userRouter.post("/", addUser);

export default userRouter;
