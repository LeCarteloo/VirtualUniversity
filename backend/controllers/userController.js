import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Register a new user
// @route GET /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, album } = req.body;

  // Checking if all fields are provided
  if (!name || !surname || !email || !password || !album) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating the user
  const user = await User.create({
    name,
    surname,
    email,
    password: hashedPassword,
    album,
  });

  res.status(201).json({
    _id: user.id,
    name: user.name,
    surname: user.surname,
    token: generateToken(user._id),
  });
});

// Generate JWT from secret key
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

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

export { registerUser, getUsers, addUser };
