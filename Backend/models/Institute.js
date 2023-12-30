// import
const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type:String
  },
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
  ],

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});


module.exports = mongoose.model("Institute",instituteSchema);