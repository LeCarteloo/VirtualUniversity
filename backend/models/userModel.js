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
      required: [true, "Please add password!"],
    },
    album: {
      type: Number,
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Please add role!"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Please add course!"],
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
    accounts: [
      {
        bankName: {
          type: String,
          required: [true, "Please add bank name!"]
        },
        accountNumber: {
          type: String,
          required: [true, "Please add account number!"]
        },
        currency: {
          type: String,
          required: [true, "Please choose currency!"]
        },
        confirmed: {
          type: Boolean,
          default: false,
        }
      }
    ],
    payments: [
      {
        title: {
          type: String,
          required: [true, "Please add title!"]
        },
        // Atm. String not Decimal128
        value: {
          type: String,
          required: [true, "Please add value!"]
        },
        due: {
          type: Date,
          required: [true, "Please add date!"]
        },
        payed: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("User", userSchema);
