import asyncHandler from "express-async-handler";
import Subject from "../models/subjectModel.js";
import Grades from "../models/gradesModel.js";

// @desc Add a new subject
// @route POST /api/subjects
// @access Private
const addSubject = asyncHandler(async (req, res) => {
  const { name, hours, ects } = req.body;

  if (!name || !hours || !ects) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Creating empty grades for every created subject
  const grades = await Grades.create({});

  const subject = await Subject.create({
    ...req.body,
    grades: grades,
  });

  res.status(200).json(subject);
});

export { addSubject };
