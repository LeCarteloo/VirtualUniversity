import Grades from "../models/gradesModel.js";
import asyncHandler from "express-async-handler";

// @desc Get user by email
// @route GET /api/grades/:email
// @access Private admin
const getGrades = asyncHandler(async (req, res) => {
  const grades = await Grades.find();

  res.status(200).json(grades);
});

export { getGrades };
