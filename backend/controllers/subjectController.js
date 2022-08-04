import asyncHandler from "express-async-handler";
import Subject from "../models/subjectModel.js";

// @desc Get all subjects
// @route GET /api/subjects
// @access Private
const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "lecturer",
        foreignField: "_id",
        as: "ref",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        type: 1,
        hours: 1,
        ects: 1,
        credit: 1,
        lecturer: {
          _id: { $first: "$ref._id" },
          name: { $first: "$ref.name" },
          surname: { $first: "$ref.surname" },
        },
      },
    },
  ]);

  res.status(200).json(subjects);
});

// @desc Add a new subject
// @route POST /api/subjects
// @access Private
const addSubject = asyncHandler(async (req, res) => {
  const { name, type, hours, ects, lecturer, credit } = req.body;

  if (!name || !hours || !ects || !lecturer || !type || !credit) {
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
    throw new Error("Subject doesn't exist!");
  }

  const updatedSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedSubject);
});

// @desc Delete subject
// @route DELETE /api/subjects/:id
// @access Private
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(400);
    throw new Error("Subject doesn't exist!");
  }

  const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedSubject);
});

export { getAllSubjects, addSubject, updateSubject, deleteSubject };
