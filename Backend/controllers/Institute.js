
//import 
const { default: mongoose } = require("mongoose");
const Exam = require("../models/Exam");
const Institute = require("../models/Institute");
const User = require("../models/User");
require("dotenv").config();


// create institute
exports.createInstitute= async (req,res)=>
{
    try {
        //data fetch fron request of body
        const { name,
            description
         } =req.body;


        //validatation 
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"Fill all Fields Properly"
            })
        }

        //check user alrady exist 
        if(await  Institute.findOne({name})){
            return res.status(400).json({
                success:false,
                message:"Institute already present !!"
            })

        }

        const instituteData= await Institute.create({
            name,
            description
        })


        //return responce 

        res.status(200).json({
            success:true,
            message:"Institute created Successfully", 
            instituteData
        })

        
    } catch (error) {

        console.log("Error occured while Create institute :",error)
        res.status(500).json({
            success:false,
            message:error.message
        })
        
        
        
    }
}

//all institute 
exports.getInstitutes = async (req,res)=>{
    try {
        const instituteData = await Institute.find();

        res.status(200).json({
            success:true,
            message:"Institute created Successfully", 
            instituteData
        })

    } catch (error) {
        console.log("Login failure error :",error)
        return res.status(500).json({
            success:false,
            message:"Login failure , please try again",
        });
    }

}

//get all institute Exams for student 
exports.getInstituteExamsForStudent = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const {instituteId} = req.body

      // console.log("ins", instituteId)
  
      if(!instituteId)
      {
        return res.status(404).json({
          success:false,
          message:"institute Not found "
        })
      }

      const instituteExams = await Institute.findById(instituteId)
       .populate({
        path: "exams",
        match: { status: "Published" },
        populate: {
          path: "examPaper",
          match: { status: "Published" },
          populate: {
            path: "questions",
          },
        },
      })
      .populate({
        path: "exams",
        match: { status: "Published" },
        populate: {
          path: "category",
         select: "name",
        },
      });
     
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instituteExams,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }

//get all institute exam for Admin
exports.getInstituteExamsForAdmin = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const {instituteId} = req.body

    console.log("ins", instituteId)

    if(!instituteId)
    {
      return res.status(404).json({
        success:false,
        message:"institute Not found "
      })
    }

    const instituteExams = await Institute.findById(instituteId)
     .populate({
      path: "exams",
      populate: {
        path: "examPaper",
        populate: {
          path: "questions",
        },
      },
    })
    .populate({
      path: "exams",
      populate: {
        path: "category",
       select: "name",
      },
    });
   

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instituteExams,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

   // get institute exam details for the paper review and history
   exports.getInstituteExamsHistory = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const {instituteId} = req.body

      console.log("ins", instituteId)
  
      if(!instituteId)
      {
        return res.status(404).json({
          success:false,
          message:"institute Not found "
        })
      }

      const instituteExams = await Institute.findById(instituteId)
       .populate({
        path: "exams",
        populate: {
          path: "examPaper",
          // populate: {
          //   path: "studentsCompleted",
          // },
          populate:{
            path:"reviews",
            populate:{
              path:"user",
              select:"name email"
            }
          }
        },
      })
      .populate({
        path: "exams",
        populate: {
          path: "examPaper",
          populate: {
            path: "studentsCompleted",
            select: "name email"
          },
        },
      })
      .populate({
        path: "exams",
        populate: {
          path: "category",
         select: "name",
        },
      });
     
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instituteExams,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }




  // get all details of Institute Student 
exports.getInstituteStudents = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
    const {instituteId}= req.body
     

      // Find all courses belonging to the instructor
      const instituteStudents = await Institute.find({_id:instituteId },
  
        ).sort({createdAt:-1}).populate("students")

  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data:instituteStudents
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve institute Student",
        error: error.message,
      })
    }
  }

  // update the student in institute 

  // delete the student from institute 
  exports.deleteInstituteStudent = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
    const {instituteId,studentId}= req.body

    if(!instituteId || !studentId)
    {
      return res.status(401).json({
        success:false,
        message:"Plesse fill all the fields"
      })
    }
    
      // find student
      const student = await User.findById(studentId)
      if(!student)
      {
        return res.status(404).json({
          success:false,
          message:"Student not found"
        })
      }
      
       student.deleteOne();

       // delete student fromthe institute 
       await Institute.findByIdAndUpdate({_id:instituteId},
        {
          $pull:{students:studentId}
        }
        )
//////////////////////////// to do delete all student
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        message:"Student Deleted Successdfully",
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to Delete Student",
        error: error.message,
      })
    }
  }