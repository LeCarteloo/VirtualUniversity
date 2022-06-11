import asyncHandler from "express-async-handler";
import Subject from "../models/subjectModel.js";

// @desc Get all subjects
// @route GET /api/subjects
// @access Private
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();

  res.status(200).json(subjects);
});

// @desc Add a new subject
// @route POST /api/subjects
// @access Private
const addSubject = asyncHandler(async (req, res) => {
  const { name, hours, ects } = req.body;

  if (!name || !hours || !ects) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const subject = await Subject.create({
    ...req.body,
  });

  res.status(200).json(subject);
});

export { getSubjects, addSubject };
