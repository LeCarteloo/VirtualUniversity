import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name!"],
  },
  surname: {
    type: String,
    required: [true, "Please add surname!"],
  },
  email: {
    type: String,
    required: [true, "Please add email!"],
  },
  password: {
    type: String,
    required: [true, "Please add password"],
  },
  album: {
    type: Number,
  },
  role: {
    type: String,
    required: [true, "Please add role"],
  },
});

export default mongoose.model("User", userSchema);
