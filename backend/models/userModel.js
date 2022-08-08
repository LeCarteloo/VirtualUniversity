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
      match:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    secEmail: {
      type: String,
      unique: true,
      match:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    telephone: {
      type: String,
    },
    idDoc: {
      type: String,
      required: [true, "Please add id document!"],
    },
    placeOfBirth: {
      type: String,
      required: [true, "Please add place of birth!"],
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
      enum: ["student", "lecturer", "admin"],
      required: [true, "Please add role!"],
    },
    courses: [
      {
        courseId: {
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
        status: {
          type: String,
          enum: ["active", "unactive", "history"],
          default: "active",
          required: [true, "Please add status!"],
        },
      },
    ],
    accounts: [
      {
        bankName: {
          type: String,
          required: [true, "Please add bank name!"],
        },
        accountNumber: {
          type: String,
          unique: true,
          required: [true, "Please add account number!"],
        },
        currency: {
          type: String,
          required: [true, "Please choose currency!"],
        },
        confirmed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    payments: [
      {
        title: {
          type: String,
          required: [true, "Please add title!"],
        },
        // Atm. String not Decimal128
        value: {
          type: String,
          required: [true, "Please add value!"],
        },
        due: {
          type: Date,
          required: [true, "Please add date!"],
        },
        payed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("User", userSchema);
