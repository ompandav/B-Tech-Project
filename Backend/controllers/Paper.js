const Paper = require("../models/Paper");
const Exam = require("../models/Exam");
const mongoose = require("mongoose");
const Question =require("../models/Question")

//create paper

exports.createPaper = async (req, res) => {
  try {
    /*  Rquired steps to create paper

          1. Fetch data from body. 
          2. Validate the fetched data.
          3. Create new paper.
          4. Add this sectoin id in exam sehema. 
          5. Send positive response.
          6. Otherwise send negative response.
    */

    //Fetch data from body.
    const { paperName, examId ,duration,status} = req.body;


    //Validate the fetched data.
    if (!paperName || !examId || !duration) {
      return res.status(401).json({
        success: false,
        message: "Please Fill all Fields",
      });
    }

    // find the exam 
    const exam = await Exam.findById(examId).populate("category");
    if (!exam) {
      return res.status(401).json({
        success: false,
        message: "Not get exam with given examId",
      });
    }



    //Create new paper.
    const paperData = await Paper.create({
      category:exam.category.name,
      examName:exam.examName,
      paperName,
      duration,
      status:status?"Published":"Draft"
    });

    // Add this sectoin id in exam sehema.

    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      {
        $push: {
          examPaper:paperData._id
        },
      },{new:true}
    ).populate({
      path:"examPaper",
      populate:{
        path:"questions",
      },

    }).exec();



    /////TODO  how yo get secction as well as question data when print updatedexam
    ///// use populate


    // Send Positive response
    res.status(200).json({
      success: true,
      message: "paper created successfully",
      updatedExam:updatedExam
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to create a paper ",
    });
  }
};

// update the paper 
exports.UpdatePaper = async (req, res) => {
  try {
    /*  Rquired steps to update paper

          1. Fetch data from body. 
          2. Validate the fetched data.
          3. Update the paper
          4. Send positive response.
          5. Otherwise send negative response.
    */

    //Fetch data from body.

        
    const {paperName,duration,paperId,examId,status} = req.body;

    //Validate the fetched data.
    if (!paperName || !paperId || !duration || !examId ) {
     return res.status(401).json({
        success: false,
        message: "Invalid paper, Please try again",
      });
    }

    //Update paper.
    const updatedPaper = await Paper.findByIdAndUpdate({_id:paperId},{
        paperName:paperName,
        duration:duration,
        status:status?"Published":"Draft"
      
    },{new:true})

    const exam = await Exam.findById(examId)
      .populate({
        path: "examPaper",
        populate: {
          path: "questions",
        },
      })

    // Send Positive response
    res.status(200).json({
      success: true,
      message: "paper updated successfully",
      updatedPaper,
      data:exam,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to update paper ",
    });
  }
};

// Delete the paper 
exports.deletePaper = async (req, res) => {
  try {
   /*  Rquired steps to delete paper

          1. Fetch data from req.params. 
          2. Validate the fetched data.
          3. Delete paper. 
          4. Send positive response.
          5. Otherwise send negative response.
    */

    //Fetch data from req.params.
       // here we consider the paperId get by the request parameter 
    const { paperId ,examId } = req.body;

    //Validate the fetched data.
    if (!paperId) {
      return res.status(401).json({
        success: false,
        message: " Please fill all fields",
      });
    }

    
    const paper = await Paper.findById(paperId);
    if(!paper)
    {
      return res.status(401).json({
        success: false,
        message: "paper not found ",
      });
    }
    
    
    //Delete paper.
    ///// TODO: do you need to delete this paper id from exam schema
    /// answer is yes 
    // virtualy it show as deleted but in data base entry is not deleted from ciurse data 
     await Paper.findByIdAndDelete(paperId)


    // update exam
    const updatedexam = await Exam.findByIdAndUpdate(examId,{
      $pull: { examPaper: paperId} },
      { new: true } ) .populate({
        path: "examPaper",
        populate: {
          path: "questions",
        },
      }).exec();


      //deleted all question under this paper
      if(paper.questions)
      {

        await Question.deleteMany({ _id: { $in: paper.questions} });
      }

      // deleted all student that give test 
      const studentsCompleted = paper.studentsCompleted
      for (const studentId of studentsCompleted) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { exams:paperId },
        })
      }
    

    // Send Positive response
    return res.status(200).json({
      success: true,
      message: "paper deleted successfully",
      data:updatedexam
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to delete paper",
      // updatedexam:updatedexam,
    });
  }
};


// get Single paper 
exports.getFullPaperDetails= async (req,res)=>{
  try {
    
    //Fetch data from body.
    const {paperId} = req.body;

    //Validate the fetched data.
    if ( !paperId ) {
     return res.status(401).json({
        success: false,
        message: "Invalid paper, Please try again",
      });
    }

    //Update paper.
    const paperData = await Paper.findById({_id:paperId}).populate("questions")

    
    // Send Positive response
    res.status(200).json({
      success: true,
      message: "paper data get successfully",
      data:paperData
    
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to get paperdata ",
    });
  }


}
