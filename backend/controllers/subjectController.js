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
  const { name, hours, ects, lecturer } = req.body;

  if (!name || !hours || !ects || !lecturer) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const subject = await Subject.create({
    ...req.body,
  });

  res.status(200).json(subject);
});

// @desc Update subject
// @route PUT /api/subjects/:id
// @access Private
const updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(400);
    throw new Error("Subject doesn't exist!")
  }

  const updatedSubject = await Subject.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    {new: true}
  )

  res.status(200).json(updatedSubject);
})

// @desc Delete subject
// @route DELETE /api/subjects/:id
// @access Private
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(400);
    throw new Error("Subject doesn't exist!")
  }

  const deletedSubject = await Subject.findByIdAndDelete(req.params.id)

  res.status(200).json(deletedSubject)
});


export { getSubjects, addSubject, updateSubject, deleteSubject };
