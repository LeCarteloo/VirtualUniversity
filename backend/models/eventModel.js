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
  // category: {
  //   type: "String",
  //   enum: ["red", "orange", "blue", "yellow", "green"],
  //   default: "blue",
  // },
  // onRepeat: {
  //   type: Number,
  // },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "Please add subject!"],
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Please add course!"],
  },
});

export default mongoose.model("Event", eventSchema);
