import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  major: {
    type: String,
    required: ["Please add major!"],
  },
  degree: {
    type: String,
    required: ["Please add degree!"],
  },
  year: {
    type: Number,
    required: ["Please add year!"],
  },
});

export default mongoose.model("Course", courseSchema);
