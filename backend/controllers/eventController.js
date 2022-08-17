import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import Subject from "../models/subjectModel.js";
import Course from "../models/courseModel.js";
import mongoose from "mongoose";

// @desc Get all events for course
// @route GET /api/events/:courseId
// @access Private
const getEvents = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    res.status(400);
    throw new Error("Course doesn't exist!");
  }

  // Joining with Subject and User model to get necessary info
  const events = await Event.aggregate([
    { $match: { courseId: mongoose.Types.ObjectId(req.params.courseId) } },
    {
      $lookup: {
        from: "subjects",
        localField: "subjectId",
        foreignField: "_id",
        as: "subjects",
      },
    },
    { $unwind: "$subjects" },
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
        startDate: 1,
        endDate: 1,
        room: 1,
        code: 1,
        isCanceled: 1,
        isOnline: 1,
        course: {
          _id: course._id,
          name: course.name,
        },
        subject: {
          _id: "$subjects._id",
          name: "$subjects.name",
        },
        author: {
          $concat: [
            { $first: "$subjects.lecturer.name" },
            " ",
            { $first: "$subjects.lecturer.surname" },
          ],
        },
      },
    },
  ]);

  res.status(200).json(events);
});

// @desc Get all events for course in date range
// @route GET /api/events/:courseId/:startDate/:endDate
// @access Private
const getEventsInRange = asyncHandler(async (req, res) => {});

// @desc Add event
// @route POST /api/events
// @access Private
const addEvent = asyncHandler(async (req, res) => {
  const { subjectId, courseId, startDate, endDate } = req.body;

  if (!subjectId || !courseId || !startDate || !endDate) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  const subject = await Subject.findById(subjectId);

  if (!subject) {
    res.status(400);
    throw new Error("Subject doesn't exist!");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    res.status(400);
    throw new Error("Course doesn't exist!");
  }

  /* Check if event is taking place between given dates
    $gte - greater or equal than, $lte - less or equal than */
  const eventInProgress = await Event.findOne({
    courseId: courseId,
    startDate: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  if (eventInProgress) {
    res.status(400);
    throw new Error("Event is taking place at this time!");
  }

  // End Date must be greater than start date
  if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
    res.status(400);
    throw new Error("Start date is greater than end date!");
  }

  const event = await Event.create({
    ...req.body,
  });

  res.status(200).json(event);
});

// @desc Update event
// @route PUT /api/events/:id
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
  const eventExist = await Event.findById(req.params.id);

  if (!eventExist) {
    res.status(400);
    throw new Error("Event doesn't exist!");
  }

  const { startDate, endDate } = req.body;

  // If one of two dates are given, API checks if event can be changed
  if (startDate || endDate) {
    const sDate = startDate ? startDate : eventExist.startDate;
    const eDate = endDate ? endDate : eventExist.endDate;

    /* Check if event is taking place between given dates
    $gte - greater or equal than, $lte - less or equal than */
    const eventInProgress = await Event.findOne({
      _id: {
        $ne: req.params.id,
      },
      courseId: eventExist.courseId,
      startDate: {
        $gte: sDate,
        $lte: eDate,
      },
    });

    if (eventInProgress) {
      res.status(400);
      throw new Error("Event is taking place at this time!");
    }

    // End Date must be greater than start date
    if (new Date(sDate).getTime() > new Date(eDate).getTime()) {
      res.status(400);
      throw new Error("Start date is greater than end date!");
    }
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEvent);
});

// @desc Delete event
// @route DELETE /api/events/:id
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
  const eventExist = await Event.findById(req.params.id);

  if (!eventExist) {
    res.status(400);
    throw new Error("Event doesn't exist!");
  }

  const deletedEvent = await Event.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedEvent);
});

export { getEvents, addEvent, updateEvent, deleteEvent };
