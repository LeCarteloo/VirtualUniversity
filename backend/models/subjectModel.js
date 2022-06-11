import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name!"],
  },
  hours: {
    type: String,
    required: [true, "Please add hours!"],
  },
  ects: {
    type: Number,
    required: [true, "Please add ECTS!"],
  },
  // grades: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: [true, "Please initialize grades!"],
  //   ref: "Grades",
  // },
});

export default mongoose.model("Subject", subjectSchema);
