// import
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },  
  exams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",

  }],

  
});


module.exports = mongoose.model("Category",categorySchema);