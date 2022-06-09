import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: ["Please add name!"],
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
