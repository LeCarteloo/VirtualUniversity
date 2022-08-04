import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";
import Subject from "../models/subjectModel.js";
import User from "../models/userModel.js";

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
      throw new Error("Please provide correct subjects!");
    }
  }

  // Create course document
  const course = await Course.create({
    ...req.body,
  });

  res.status(200).json(course);
});

// @desc Get all courses
// @route Get /api/courses
// @access Private
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  res.status(200).json(courses);
});

// @desc Get all data of user courses
// @route Get /api/courses/me
// @access Private
const getMySyllabus = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  const userCourses = user.courses.map((course) => course.courseId);

  // {{ _id: { $in: userCourses } }}
  const courses = await Course.aggregate([
    { $match: { _id: { $in: userCourses } } },
    { $unwind: "$subjects" },
    {
      $lookup: {
        from: "subjects",
        localField: "subjects",
        foreignField: "_id",
        as: "ref",
      },
    },
    {
      $project: {
        _id: 1,
        year: 1,
        semester: 1,
        subjects: {
          name: { $first: "$ref.name" },
          lecturer: { $first: "$ref.lecturer" },
          type: { $first: "$ref.type" },
          hours: { $first: "$ref.hours" },
          ects: { $first: "$ref.ects" },
          credit: { $first: "$ref.credit" },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        year: { $first: "$year" },
        semester: { $first: "$semester" },
        subjects: { $push: "$subjects" },
      },
    },
  ]);

  res.status(200).json(courses);
});

// @desc Add a charge to all students with given course
// @route POST /api/courses/charges/:id
// @access Private
const addCharge = asyncHandler(async (req, res) => {
  const { title, value, due } = req.body;

  if (!title || !value || !due) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("Course doesn't exist!");
  }

  const updatedUsers = await User.updateMany(
    { course: course._id },
    {
      $push: {
        payments: {
          ...req.body,
        },
      },
    }
  );

  res.status(200).json(updatedUsers);
});

export { getCourses, getMySyllabus, addCourse, addCharge };
