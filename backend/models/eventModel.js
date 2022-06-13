import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: [true, "Please add start date!"],
        min: new Date()
    },
    endDate: {
        type: Date,
        required: [true, "Please add end date!"]
    },
    room: {
        type: String,
        default: null
    },
    code: {
        type: String,
        default: null,
    },
    isCanceled: {
        type: Boolean,
        default: false,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    // Atm. boolean value (reapting every 7 days)
    onReapet: {
        type: Boolean,
        default: false,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: [true, "Please add subject!"]
    }
});

export default mongoose.model("Event", eventSchema);