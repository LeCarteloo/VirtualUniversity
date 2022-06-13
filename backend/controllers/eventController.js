import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js"
import Subject from "../models/subjectModel.js"
import Course from "../models/courseModel.js"

// @desc Get all events for course
// @route GET /api/events/:courseId
// @access Private 
const getEvents = asyncHandler(async (req, res) =>{

    const courseExist = Course.findById(req.params.courseId);

    if (!courseExist) {
        res.status(400);
        throw new Error("Course doesn't exist!")
    }

    // console.log(courseExist);
});


// @desc Add event
// @route POST /api/events
// @access Private 
const addEvent = asyncHandler(async (req, res) => {
    const {subjectId, startDate, endDate} = req.body;

    if (!subjectId || !startDate || !endDate) {
        res.status(400);
        throw new Error("Please add all fields!");
    }

    const subject = await Subject.findById(subjectId);

    if (!subject) {
        res.status(400);
        throw new Error("Subject doesn't exist!");
    }

    /* Check if event is taking place between given dates
    $gte - greater or equal than, $lte - less or equal than */
    const eventExist = await Event.findOne({
        startDate: {
            $gte: startDate,
            $lte: endDate,
        }
    });

    if (eventExist) {
        res.status(400);
        throw new Error("Event is taking place at this time!")
    }

    // End Date must be greater than start date
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        res.status(400);
        throw new Error("Start date is greater than end date!");
    }

    const event = await Event.create({
        ...req.body
    });

    res.status(200).json(event);
});


export { getEvents, addEvent }