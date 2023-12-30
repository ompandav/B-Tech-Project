// import
const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },
  
  examPaper: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
    },
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  
  institute:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Institute",
    required:true,
  },
  status:{
    type:String,
    enum :["Draft", "Published"]
  },

  createdAt:{
    type:Date,
    default: function () {
      return new Date();
    }
  },
});

module.exports = mongoose.model("Exam", examSchema);
