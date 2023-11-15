// const { Timestamp } = require("mongodb");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const qtnSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    aboutCar: {
      type: String,
      // required: true,
    },
    carRegistration: {
      type: String,
      // required: true,
    },                        
    descriptionCategori: {
      type: String,
      // required: true,
    },
    summaryQtn: {
      type: String,
      // required: true,
    },
    detailProblem: {
      type: String,
      // required: true,
    },
    imgError: {
      type: String,
      // required: true,
    },     
    answer: {
      type: String,
      // required: true,
    },
    termAndCondition: {
      type: String,
      // required: true,
    },
    confidential: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Qtn = mongoose.model("Qtn", qtnSchema);
// module.exports = Qtn;
export default Qtn