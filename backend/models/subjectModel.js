import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name!"],
  },
  type: {
    type: String,
    required: [true, "Please add type!"],
  },
  hours: {
    type: String,
    required: [true, "Please add hours!"],
  },
  ects: {
    type: Number,
    required: [true, "Please add ECTS!"],
  },
  credit: {
    type: String,
    required: [true, "Please add credit!"]
  }
  // lecturer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: [true, "Please add lecturer!"]
  // }
});

export default mongoose.model("Subject", subjectSchema);
