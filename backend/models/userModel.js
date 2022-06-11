import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
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
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    album: {
      type: Number,
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Please add role"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add course"],
    },
    subjects: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
        firstTerm: {
          type: mongoose.Schema.Types.Decimal128,
          default: null,
        },
        secondTerm: {
          type: mongoose.Schema.Types.Decimal128,
          default: null,
        },
        conditional: {
          type: mongoose.Schema.Types.Decimal128,
          default: null,
        },
        promotion: {
          type: mongoose.Schema.Types.Decimal128,
          default: null,
        },
        committe: {
          type: mongoose.Schema.Types.Decimal128,
          default: null,
        },
      },
    ],
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("User", userSchema);
