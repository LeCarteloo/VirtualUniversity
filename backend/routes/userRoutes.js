import express from "express";
import {
  addUser,
  getUsers,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Adding routes with functions from controller
userRouter.post("/register", registerUser);
userRouter.get("/", getUsers);
userRouter.post("/", addUser);

export default userRouter;
