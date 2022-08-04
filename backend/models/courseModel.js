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
  semester: {
    type: String,
    required: ["Please add semester!"],
  },
  type: {
    type: String,
    required: ["Please add type!"],
  },
  department: {
    type: String,
    required: ["Please add department!"],
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

export default mongoose.model("Course", courseSchema);
