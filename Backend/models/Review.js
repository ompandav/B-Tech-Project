// import
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },

   user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paper:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Paper",
      required:true,
    }
  
});


module.exports = mongoose.model("Review",reviewSchema);