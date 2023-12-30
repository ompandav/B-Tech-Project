// import
const mongoose = require("mongoose");




const questionSchema = new mongoose.Schema({

  quest: {
    type: String,
    required: true,
   
  },
  options :{
    type:[String],
    required:true
  }, 

  correct: {
    type: String,
    required: true,
   
  }, 
   
});


module.exports = mongoose.model("Question",questionSchema);