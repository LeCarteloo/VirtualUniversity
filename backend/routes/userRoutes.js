import express from "express";
import {
  addAccount,
  getUser,
  getUsers,
  loginUser,
  registerUser,
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
userRouter.put("/account", protectUser, addAccount);


export default userRouter;
