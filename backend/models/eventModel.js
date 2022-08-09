import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, "Please add start date!"],
    min: new Date(),
  },
  endDate: {
    type: Date,
    required: [true, "Please add end date!"],
  },
  room: {
    type: String,
  },
  code: {
    type: String,
  },
  isCanceled: {
    type: Boolean,
  },
  isOnline: {
    type: Boolean,
  },
  // Atm. boolean value (reapting every 7 days)
  onReapet: {
    type: Boolean,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add subject!"],
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Please add course!"],
  },
});

export default mongoose.model("Event", eventSchema);
