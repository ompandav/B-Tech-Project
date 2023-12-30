// import
const mongoose = require("mongoose");

const progressesSchema = new mongoose.Schema({
 submitedAt:{
    type:Date,
    default: function () {
      return new Date();
    }
 },
 totalQuestion:{
   type:Number,
   required:true
 },
  timeRequired:{
    type:Number,
    required:true,
  },
  score:{
    type:Number,
    required:true,
  },
  answered:{
    type:Number,
    required:true
  },
  result: {
    type: String,
    required: true,
    enum: ["Pass", "Fail"],
  },
});


module.exports = mongoose.model("Progresses",progressesSchema);