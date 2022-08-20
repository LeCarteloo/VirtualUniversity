import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // TODO: In future album should be auto generated
  const {
    name,
    surname,
    email,
    password,
    telephone,
    idDoc,
    placeOfBirth,
    course,
  } = req.body;

  let role = req.body?.role.toLowerCase();
  // Checking if all fields are provided
  if (
    !name ||
    !surname ||
    !email ||
    !password ||
    !role ||
    !placeOfBirth ||
    !idDoc
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExist = await User.findOne({ email });

  let courseToAdd = [];

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Adding course and subjects only for students
  if (role === "student") {
    if (!course) {
      res.status(400);
      throw new Error("Please add course");
    }

    // Check if course exists
    const courseExist = await Course.findById(course);

    if (!courseExist) {
      res.status(400);
      throw new Error("Course doesn't exist");
    }

    let subjects = [];

    for (const subjectId of courseExist.subjects) {
      subjects.push({
        subjectId: subjectId,
      });
    }

    courseToAdd = {
      courseId: courseExist._id,
      subjects,
    };
  }

  // For tests only
  const album = 2022 + Math.floor(Math.random() * 100);

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating the user
  const user = await User.create({
    name,
    surname,
    email,
    telephone,
    idDoc,
    placeOfBirth,
    password: hashedPassword,
    album,
    role,
    ...(role === "student" && { courses: courseToAdd }),
  });

  res.status(201).json({
    _id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    album: user.album,
    role: user.role,
    ...(user.role === "student" && { courses: user.courses }),
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

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { name, surname, album, role, course } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist!");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      surname,
      album,
      role,
      course,
    },
    { new: true }
  );

  res.status(200).json(updatedUser);
});

// @desc Update contact
// @route PUT /api/users/contact
// @access Private
const updateContact = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { secEmail, telephone } = req.body;

  // if (!secEmail || !telephone) {
  //   res.status(400);
  //   throw new Error("Please add all fields");
  // }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  ).select("-password -courses -accounts -payments");

  res.status(200).json(updatedUser);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist!");
  }

  const deletedUser = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ _id: deletedUser.id });
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

  // if (role !== "admin") {
  //   res.status(401);
  //   throw new Error("Not authorized");
  // }

  // Get all users
  const users = await User.aggregate([
    {
      $unwind: {
        path: "$courses",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "courses.courseId",
        foreignField: "_id",
        as: "courRef",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        surname: 1,
        email: 1,
        placeOfBirth: 1,
        idDoc: 1,
        role: 1,
        album: 1,
        courses: {
          _id: "$courses.courseId",
          name: { $first: "$courRef.name" },
          year: { $first: "$courRef.year" },
          semester: { $first: "$courRef.semester" },
          status: 1,
        },
        accounts: 1,
        payments: 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        surname: { $first: "$surname" },
        email: { $first: "$email" },
        idDoc: { $first: "$idDoc" },
        placeOfBirth: { $first: "$placeOfBirth" },
        role: { $first: "$role" },
        album: { $first: "$album" },
        courses: { $push: "$courses" },
        accounts: { $first: "$accounts" },
        payments: { $first: "$payments" },
      },
    },
  ]);

  // const combine = [...users, ...aggregate];

  res.status(200).json(users);
});

// @desc Search for user by name or surname
// @route GET /api/users/search/:query
// @access Private admin
const searchUser = asyncHandler(async (req, res) => {
  // const { role } = req.user;
  const query = req.params.query;

  // if (role !== "admin") {
  //   throw new Error("Not authorized");
  // }

  const user = await User.aggregate([
    {
      $search: {
        index: "searchUsers",
        compound: {
          should: [
            {
              autocomplete: {
                query: query,
                path: "name",
              },
            },
            {
              autocomplete: {
                query: query,
                path: "surname",
              },
            },
            {
              autocomplete: {
                query: query,
                path: "email",
              },
            },
          ],
        },
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 1,
        name: { $concat: ["$name", " ", "$surname"] },
        extra: "$email",
      },
    },
  ]);

  res.status(200).json(user);
});

// @desc Add bank account
// @route POST /api/users/account
// @access Private
const addAccount = asyncHandler(async (req, res) => {
  const { _id } = req.user;
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

  let formatedNumber = "";
  for (let i = 0; i < accountNumber.toString().length; i++) {
    if (i !== 0 && (i === 2 || (formatedNumber.length + 3) % 5 === 0)) {
      formatedNumber += " ";
    }
    formatedNumber += accountNumber.charAt(i);
  }

  // Getting the user and pushing account info to array
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      $push: {
        accounts: {
          bankName,
          accountNumber: formatedNumber,
          currency,
        },
      },
    },
    { new: true }
  ).select("accounts");

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
  const users = await User.find({ role: req.params.role }).select(
    "name surname email"
  );

  res.status(200).json(users);
});

// @desc Get my data
// @route GET /api/users/data/me
// @access Private
const getMyCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  const activeCourse = user.courses.find(
    (course) => course.status === "active"
  );

  const courseData = await Course.findById(activeCourse.courseId).select(
    "-subjects"
  );

  if (!courseData) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(courseData);
});

// @desc Get my data
// @route GET /api/users/data/me
// @access Private
const getMyData = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).select("-password");

  res.status(200).json(user);
});

// @desc Get user
// @route GET /api/users/grades/me
// @access Private
const getMyGrades = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist!");
  }

  /*
    Joining two documents, getting names and types from Subject 
    model by subjectIds found in Subject array inside User model 
  */
  const aggregation = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $match: { "courses.status": "active" } },
    { $unwind: "$courses" },
    { $unwind: "$courses.subjects" },
    {
      $lookup: {
        from: "subjects",
        localField: "courses.subjects.subjectId",
        foreignField: "_id",
        as: "ref",
      },
    },
    {
      $project: {
        subjects: {
          id: { $first: "$ref._id" },
          name: { $first: "$ref.name" },
          type: { $first: "$ref.type" },
          firstTerm: "$courses.subjects.firstTerm",
          secondTerm: "$courses.subjects.secondTerm",
          conditional: "$courses.subjects.conditional",
          promotion: "$courses.subjects.promotion",
          committe: "$courses.subjects.committe",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        subjects: { $push: "$subjects" },
      },
    },
  ]);

  // Temp. solution with [0]
  res.status(200).json(aggregation[0]?.subjects);
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
  updateUser,
  updateContact,
  deleteUser,
  refreshToken,
  getUsers,
  searchUser,
  getUsersByRole,
  addAccount,
  getCharges,
  updateCharge,
  getMyData,
  getMyCourse,
  getMyGrades,
  getAverageGrade,
};
