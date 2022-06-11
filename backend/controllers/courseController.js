import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";
import Subject from "../models/subjectModel.js";
import mongoose from "mongoose";

// @desc Add a new course
// @route POST /api/courses
// @access Private
const addCourse = asyncHandler(async (req, res) => {
  const { name, degree, year, subjects } = req.body;

  // Checking if all elements are provided
  if (!name || !degree || !year || !subjects) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Checking if all provided subjects are in database
  for (let subjectId of subjects) {
    const exists = await Subject.findById(subjectId);

    if (!exists) {
      throw new Error("Please provide correct subject");
    }
  }

  // Create course document
  const course = await Course.create({
    ...req.body,
  });

  res.status(200).json(course);
});

export { addCourse };
