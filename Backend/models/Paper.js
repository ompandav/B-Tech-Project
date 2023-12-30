// import
const { request } = require("express");
const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  category:{
    type:String,
    required:true
  },
  examName:{
    type:String,
    required:true
  },
  paperName: {
    type: String,
    required: true,
  },

  duration:{
    type:Number,
    required:true,
  },

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],

  studentsCompleted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
   
  ],
  reviews:[
    {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Review",
     // required: true,
    }
 ],
 createdAt:{
  type:Date,
  default: function () {
    return new Date();
  }
},
status:{
  type:String,
  enum :["Draft", "Published"]
},

});


   
  

module.exports = mongoose.model("Paper", paperSchema);
