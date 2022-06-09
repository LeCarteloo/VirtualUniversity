import mongoose from "mongoose";
// import Decimal128 from "mongoose";

const gradesSchema = mongoose.Schema({
  firstTerm: {
    type: Number,
    default: null,
  },
  secondTerm: {
    type: Number,
    default: null,
  },
  conditional: {
    type: Number,
    default: null,
  },
  promotion: {
    type: Number,
    default: null,
  },
  committe: {
    type: Number,
    default: null,
  },
});

export default mongoose.model("Grades", gradesSchema);
