import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

// @desc Add a new course
// @route POST /api/courses
// @access Private
const addCourse = asyncHandler(async (req, res) => {
  const { name, degree, year } = req.body;

  if (!name || !degree || !year) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const course = await Course.create({
    ...req.body,
  });

  res.status(200).json(course);
});

export { addCourse };
