import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // TODO: In future album should be auto generated
  const { name, surname, email, password, role, course } = req.body;

  // Checking if all fields are provided
  if (!name || !surname || !email || !password || !role || !course) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Check if course exists
  const courseExist = await Course.findById(course);

  if (!courseExist) {
    res.status(400);
    throw new Error("Course doesn't exist");
  }

  // For tests only
  const album = courseExist.year + Math.floor(Math.random() * 100);

  let subjects = [];

  for (const subjectId of courseExist.subjects) {
    subjects.push({
      subjectId: subjectId,
    });
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
    course,
    subjects,
  });

  res.status(201).json({
    _id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    album: user.album,
    role: user.role,
    course: user.course,
    subjects: user.subjects,
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

  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials!");
  }

  // Check if password is correct
  const isPassCorrect = await bcrypt.compare(password, user.password);

  if (!isPassCorrect) {
    res.status(400);
    throw new Error("Invalid credentials!");
  }

  const token = generateToken(
    user._id,
    user.role,
    process.env.JWT_SECRET,
    process.env.JWT_LIFE
  );

  const refreshToken = generateToken(
    user._id,
    user.role,
    process.env.JWT_REF_SECRET,
    process.env.JWT_REF_LIFE
  );

  // Updating the refresh token inside logging user
  await User.findOneAndUpdate({ email }, { refreshToken: refreshToken });

  // TODO: On production uncomment options below
  // Sending HTTP only cookie and user object with token
  res.cookie("token", refreshToken, {
    // secure: true,
    // httpOnly: true,
    // sameSite: "none",
    maxAge: 86400000,
  });

  res.json({
    _id: user.id,
    name: user.name,
    surname: user.surname,
    role: user.role,
    token: token,
  });
});

// @desc Logout user
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies || !cookies.token) {
    res.sendStatus(204);
  }

  const refreshToken = cookies.token;
  // Check if token exists in database
  const user = await User.findOne({ refreshToken });

  if (!user) {
    // Clearing cookie from client memory
    res.clearCookie("token", { httpOnly: true, maxAge: 86400000 });
    res.sendStatus(204);
  }

  // Removing refresh token from found user
  await User.findOneAndUpdate(
    { refreshToken },
    {
      $unset: { refreshToken: "" },
    }
  );

  // TODO: On production add secure: true (for https only)
  res.clearCookie("token", { httpOnly: true, maxAge: 86400000 });
  res.sendStatus(204);
});

// @desc Refresh the JWT token
// @route POST /api/users/refresh
// @access Public
const refreshToken = asyncHandler(async (req, res) => {
  // HTTP only cookie
  const cookies = req.cookies;

  if (!cookies || !cookies.token) {
    res.status(401);
    throw new Error("Missing token");
  }

  const refreshToken = cookies.token;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.status(403);
    throw new Error("Not authorized");
  }

  // Decoding token
  const decoded = jwt.verify(refreshToken, process.env.JWT_REF_SECRET);

  if (decoded.id !== user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  const newToken = generateToken(
    decoded.id,
    decoded.role,
    process.env.JWT_SECRET,
    process.env.JWT_LIFE
  );

  res.status(200).json({ role: decoded.role, token: newToken });
});

// @desc Get all users
// @route GET /api/users
// @access Private admin
const getUsers = asyncHandler(async (req, res) => {
  // Getting role from auth middleware
  const { role } = req.user;

  if (role !== "admin") {
    res.status(401);
    throw new Error("Not authorized");
  }

  // Get all users
  const users = await User.find().select("-password -role -__v -refreshToken");

  res.status(200).json(users);
});

// @desc Get user by email
// @route GET /api/users/:email
// @access Private admin
const getUser = asyncHandler(async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw new Error("Not authorized");
  }

  const user = await User.findOne({ email: req.params.email }).select(
    "-password -role"
  );

  if (!user) {
    throw new Error("User does not exists");
  }

  res.status(200).json({
    name: user.name,
    surname: user.surname,
    email: user.email,
    album: user.album,
  });
});

// @desc Add bank account
// @route POST /api/users/account
// @access Private
const addAccount = asyncHandler(async (req, res) => {
  const { bankName, accountNumber, currency } = req.body;

  if (!bankName || !accountNumber || !currency) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  // TODO: Later add number check
  // const accDigits = accountNumber.test("[0-9+]");

  if (accountNumber.toString().length !== 26) {
    res.status(400);
    throw new Error("Account number must have 26 digits!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist!");
  }

  // Getting the user and pushing account info to array
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $push: {
        accounts: {
          bankName,
          accountNumber,
          currency,
        },
      },
    },
    { new: true }
  ).select("-password -role");

  res.status(200).json(updatedUser);
});

// @desc Get all users with charges by CourseID
// @route GET /api/users/charges/:courseId
// @access Private
const getCharges = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    res.status(400);
    throw new Error("Course doesn't exist!");
  }

  // Get all users with given courseId, that has at least one payment
  const users = await User.find({
    course: course._id,
    "payments.0": {
      $exists: true,
    },
  }).select("-password -role -course -subjects -accounts");

  res.status(200).json(users);
});

// @desc Update charge by user id
// @route PUT /api/users/charges/:userId
// @access Private
const updateCharge = asyncHandler(async (req, res) => {
  const { title, payed } = req.body;

  if (!title || !payed) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist!");
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: user._id,
      "payments.title": title,
    },
    {
      $set: {
        "payments.0.payed": payed,
      },
    },
    { new: false }
  );

  res.status(200).json(updatedUser);
});

// @desc Get all users with role
// @route GET /api/users/role/:role
// @access Private
const getUsersByRole = asyncHandler(async (req, res) => {
  const users = await User.find({ role: req.params.role });

  res.status(200).json(users);
});

// @desc Add grade to subject by userId
// @route PUT /api/users/grades/:userId
// @access Private
// const addGrade = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.userId);

//   if (!user) {
//     res.status(400);
//     throw new Error("User doesn't exist!");
//   }

//   const updatedUser = await User.findOneAndUpdate({
//     _id: user._id,

//   })
// });

// @desc Get average user grades
// @route GET /api/users/grades/:userId
// @access Private
const getAverageGrade = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist!");
  }

  // console.log(user.subjects[3]);

  res.status(200).json("tests");
});

// Generate JWT from secret key
const generateToken = (id, role, secret, life) => {
  return jwt.sign({ id, role }, secret, { expiresIn: life });
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUsers,
  getUser,
  getUsersByRole,
  addAccount,
  getCharges,
  updateCharge,
  getAverageGrade,
};
