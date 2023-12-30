
const Paper = require("../models/Paper");
const Question = require("../models/Question");
const { options } = require("../routes/Route");

require("dotenv").config();


//create question
exports.createQuestion = async (req, res) => {
  try {
    /*  Rquired steps to create question

          1. Fetch data from body. 
          2. Validate the fetched data.
          3. Upload the video file on clodinary and get link for videoUrl.
          4. Create new question.
          5. Add this question id in paper sehema. 
          6. Send positive response.
          7. Otherwise send negative response.
    */

    //Fetch data from body.
    let { 
      quest ,
      options:_options, 
      correct,
      paperId } = req.body;



    //Validate the fetched data.
    if (!quest  || !paperId || !correct) {
     return res.status(401).json({
        success: false,
        message: "Please Fill all Fields",
      });
    }

    const options = JSON.parse(_options)
    

  

    //Create new question.
    const questionData = await Question.create({ 
        quest,
        options:options,
        correct,
 });

    // Add this sectoin id in paper sehema.

    const updatedPaper = await Paper.findByIdAndUpdate(
      { _id: paperId },
      {
        $push: {
         questions:questionData._id,
        },
      },{new:true}
    ).populate("questions");

    ///// HW : log updatdpaper here , after populate query 
    // Send Positive response
     res.status(200).json({
      success: true,
      message: "question created successfully",
      questionData,
      data: updatedPaper,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to create a question ",
    });
  }
};

// update the question 
exports.updateQuestion = async (req, res) => {
  try {
    /*  Rquired steps to update question

          1. Fetch data from body. 
          2. Validate the fetched data.
          3. Update the question
          4. Send positive response.
          5. Otherwise send negative response.
    */

    //Fetch data from body.

        
    let {
         quest,
         options:_options,
         correct
         ,questionId 
         ,paperId} = req.body;
    


    //Validate the fetched data.

    const question = await Question.findById(questionId)

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "question not found",
      })
    }

    // convert option into the array
    const options = JSON.parse(_options)

    if (quest !== undefined) {
      question.quest = quest
    }

    if (options !== undefined) {
      question.options = options
    }

    if(correct !== undefined)
    {
      question.correct=correct
    }

    await question.save()
    
    
    
    // return updated paper 
    const updatedPaper = await Paper.findById(paperId).populate(
      "questions"
    )


    // Send Positive response
    res.status(200).json({
      success: true,
      message: "question updated successfully",
      data:updatedPaper,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to update question ",
    });
  }
};


// Delete the question 
exports.deleteQuestion = async (req, res) => {
  try {
   /*  Rquired steps to delete question

          1. Fetch data from req.params. 
          2. Validate the fetched data.
          3. Delete question. 
          4. Send positive response.
          5. Otherwise send negative response.
    */

    //Fetch data from req.params.
       // here we consider the questionId get by the request parameter 
    const { questionId ,paperId} = req.body;

    //Validate the fetched data.
    if (!questionId ||!paperId) {
      return res.status(401).json({
        success: false,
        message: " Please fill all fields",
      });
    }

    //Delete question.
    const question = await Question.findById(questionId)

    if(!question){
      return res.status(401).json({
        success: false,
        message: "question is not present",
      });
    }


    // delete question 
    question.deleteOne();

    // delete this question from paper 
    await Paper.findByIdAndUpdate(paperId, {$pull:{questions:questionId}},{new:true}).exec();

    const updatdPaper = await Paper.findById(paperId).populate("questions")


    // Send Positive response
    res.status(200).json({
      success: true,
      message: "question deleted successfully",
      // deletedquestion : question,
      data:updatdPaper,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to delete question",
    });
  }
};
