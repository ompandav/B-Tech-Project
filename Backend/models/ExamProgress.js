// import
const mongoose = require("mongoose");

const examProgressSchema = new mongoose.Schema({
 
  paperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paper",
    required: true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  progresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Progresses",
      required: true,
    },
  ],
});


module.exports = mongoose.model("ExamProgress",examProgressSchema);