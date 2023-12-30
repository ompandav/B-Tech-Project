// import
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  contact:{
    type:Number,
    required:true,

  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["1Star", "2Star", "3Star"],
    default:"1Star"
  },
 
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
  ],

  examProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamProgress",
      required: true,
    },
  ],
  institute:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Institute",
    required:true,
  }
});


module.exports = mongoose.model("User",userSchema);