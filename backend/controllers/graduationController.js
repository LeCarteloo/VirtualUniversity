import Graduation from "../models/graduationModel.js"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

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

export { addGraduation, updateGraduation }