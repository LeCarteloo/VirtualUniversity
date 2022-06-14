import Graduation from "../models/graduationModel.js"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

// @desc Get user graduation work
// @route GET /api/graduation
// @access Private
const getGraduation = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User doesn't exist!")
    }

    const graduation = await Graduation.find({user: user._id})

    if (!graduation) {
        res.status(400);
        throw new Error("User doesn't have graduation work!");
    }

    res.status(200).json(graduation);
});

// @desc Get graduation work by user
// @route GET /api/graduation/:userId
// @access Private
const getGraduationById = asyncHandler(async (req, res) =>{

    const user = await User.findById(req.params.userId);

    if (!user) {
        res.status(400);
        throw new Error("User doesn't exist!")
    }

    const graduation = await Graduation.findOne({user: req.params.userId});

    res.status(200).json(graduation);
});

// @desc Add graduation work
// @route POST /api/graduation/
// @access Private
const addGraduation = asyncHandler(async (req, res) => {
    const { user } = req.body;

    const userExist = await User.findById(user)

    if(!userExist) {
        res.status(400);
        throw new Error("User doesn't exist!")
    }

    const graduation = await Graduation.create({
        ...req.body
    })

    res.status(200).json(graduation);
})

// @desc Update users graduation work
// @route PUT /api/graduation/:id
// @access Private
const updateGraduation = asyncHandler(async (req, res) => {

    const graduation = await Graduation.findOne({
        user: req.params.id
    });

    if(!graduation) {
        res.status(400);
        throw new Error("User doesn't exist!")
    }

    const updatedGraduation = await Graduation.findByIdAndUpdate(
        graduation._id, 
        req.body, 
        { new: true }
    )

    res.status(200).json(updatedGraduation);
})

export { getGraduation, getGraduationById, addGraduation, updateGraduation }