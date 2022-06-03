import asyncHandler from "express-async-handler";
import Subject from "../models/subjectModel.js";

// @desc Register a new user
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
    lecturer: req.user.id,
  });

  res.status(200).json(subject);
});

export { addSubject };
