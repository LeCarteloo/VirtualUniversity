import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, album, role } = req.body;

  // Checking if all fields are provided
  if (!name || !surname || !email || !password || !album || !role) {
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
    role,
  });

  res.status(201).json({
    _id: user.id,
    name: user.name,
    surname: user.surname,
    token: generateToken(user._id, user.role),
  });
});

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user with provided email exists
  const user = await User.findOne({ email });

  // Check if password is correct
  const isPassCorrect = await bcrypt.compare(password, user.password);

  if (!user || !isPassCorrect) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    surname: user.surname,
    token: generateToken(user._id, user.role),
  });
});

// Generate JWT from secret key
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// @desc Get info about users
// @route GET /api/users
// @access Atm. Public
const getUsers = asyncHandler(async (req, res) => {
  // Get all users
  const users = await User.find();

  res.status(200).json(users);
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

export { registerUser, loginUser, getUsers, addUser };
