import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc Get info about users
// @route GET /api/users
// @access Atm. Public
const getUsers = asyncHandler(async (req, res) => {
  // Get all users
  const user = await User.find();

  res.status(200).json(user);
});

// @desc Add user
// @route POST /api/users
// @access Atm. Public
const addUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, album } = req.body;

  // Check if all fields are provided
  if (!name || !surname || !email || !password || !album) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    surname,
    email,
    password,
    album,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    name: user.name,
    surname: user.surname,
    email: user.email,
    album: user.album,
  });
});

export { getUsers, addUser };
