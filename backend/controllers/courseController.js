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
  const courses = await Course.aggregate([
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
        name: 1,
        degree: 1,
        year: 1,
        semester: 1,
        type: 1,
        department: 1,
        subjects: {
          _id: { $first: "$ref._id" },
          name: { $first: "$ref.name" },
          type: { $first: "$ref.type" },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        degree: { $first: "$degree" },
        year: { $first: "$year" },
        semester: { $first: "$semester" },
        type: { $first: "$type" },
        department: { $first: "$department" },
        subjects: { $push: "$subjects" },
      },
    },
  ]);

  res.status(200).json(courses);
});

// @desc Update course with given id
// @route Put /api/courses/:id
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
  const courseExist = await Course.findById(req.params.id);

  if (!courseExist) {
    res.status(400);
    throw new Error("Course doesn't exist!");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    ...req.body,
    { new: true }
  );

  res.status(200).json(updateCourse);
});

// @desc Delete course with given id
// @route Delete /api/courses/:id
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
  const courseExist = await Course.findById(req.params.id);

  if (!courseExist) {
    res.status(400);
    throw new Error("Course doesn't exist!");
  }

  const deletedCourse = await Course.findByIdAndDelete(req.params.id, {
    new: true,
  });

  res.status(200).json(deletedCourse);
});

// @desc Search for courses by name or semester
// @route Get /api/courses/search/:query
// @access Private
const searchCoruses = asyncHandler(async (req, res) => {
  const query = req.params.query;

  const courses = await Course.aggregate([
    {
      $search: {
        index: "searchCourses",
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
                path: "semester",
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
        name: 1,
        extra: { $concat: [{ $toString: "$year" }, " ", "$semester"] },
      },
    },
  ]);

  res.status(200).json(courses);
});

// @desc Get all data of user courses
// @route Get /api/courses/me
// @access Private
const getMySyllabus = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  const userCourses = user.courses.map((course) => course.courseId);

  const courses = await Course.aggregate([
    { $match: { _id: { $in: userCourses } } },
    {
      $lookup: {
        from: "subjects",
        localField: "subjects",
        foreignField: "_id",
        as: "subjects",
      },
    },
    {
      $unwind: {
        path: "$subjects",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subjects.lecturer",
        foreignField: "_id",
        as: "subjects.lecturer",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        year: 1,
        semester: 1,
        subjects: {
          _id: "$subjects._id",
          name: "$subjects.name",
          type: "$subjects.type",
          ects: "$subjects.ects",
          hours: "$subjects.hours",
          credit: "$subjects.credit",
          lecturer: {
            $concat: [
              { $first: "$subjects.lecturer.name" },
              " ",
              { $first: "$subjects.lecturer.surname" },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        year: { $first: "$year" },
        semester: { $first: "$semester" },
        subjects: {
          $push: "$subjects",
        },
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

export {
  searchCoruses,
  getCourses,
  updateCourse,
  deleteCourse,
  getMySyllabus,
  addCourse,
  addCharge,
};
