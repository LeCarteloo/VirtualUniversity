import express from "express";
import { addUser, getUsers } from "../controllers/userController.js";

const userRouter = express.Router();

// Adding routes with functions from controller
userRouter.get("/", getUsers);
userRouter.post("/", addUser);

export default userRouter;
