
// const Course = require("../models/Course");
const Category = require("../models/Category")
const User = require("../models/User")
const Exam = require("../models/Exam");
const Paper = require("../models/Paper")
const Catagory = require('../models/Category')
const Question = require("../models/Question");
const Institute = require("../models/Institute");

function convertSecondsToDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor((totalSeconds % 3600) % 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}


//create the new exam 

exports.createExam = async (req, res)=>
{
    /*
     To create the course the required steps are below,

     1. Fetch the data from request body. 
     2. Get image file from request files for thumbNail.
     3. Validate Data.
     4. Find the instructor using req.use.id and validate it.
     5. Get category details and validate it.
     6. Uoload the image of thumbNail on cloudinary and get url.
     7. Create entry in Course Schema.
     8. Add this course id in instructor's courses arrray
     9. Similariy in Catagory  schema
     10. Return positive response.
     11. Otherwise return negative response
     */

    try {
        //get data from body 
        let {
            examName, 
            category,
           instituteId,
           status,
        } =req.body;
        
       

       //validate the data 
       if(!examName || !category || !instituteId || !status) 
       {
        return res.status(401).json({
            success: false,
            message: "All fildes required, please fill all.",
          });

       }   

  
         //fetch the details of Catagory
         const categoryDetails = await Category.findById({_id:category});

         //check tag is present 
 
         if(!categoryDetails)
         {
             return res.status(404).json({
                 success:false,
                 message:"category Not Found"
             });
         }

         //create the entry in Database 
         const newExam = await Exam.create({
            examName,
            category:categoryDetails._id,
            institute:instituteId,
            status:status
         })


        //update the Category Schema 
        await Category.findByIdAndUpdate({_id:category},
            {
                $push:{
                 exams:newExam._id,
                 
                }

        }, {new:true})

        // Add this exam in institute

        await Institute.findOneAndUpdate({_id:instituteId},{
          $push:{
            exams:newExam._id,
          }
        })

        res.status(200).json({
            success:true,
            message:"Exam created successfully",
            data:newExam,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed to create a exam ",
          });
        
        
    }

}

//update exam 

exports.UpdateExam = async (req,res)=>{

/*
// Required steps for to uodate exam 
  1. Fetch data from body 
  2. Validate data 
  3. By using findByIdAndUpdate() function update all data 
  4. return response 
 */


  try {
        //   1. Fetch data from body 
        const {examId} = req.body ;

        // fetch all updated value fron the req body 
        const updates=req.body
        

        // find the exam 
          const exam = await Exam.findById(examId)
       
        if(!exam){
            return res.status(404).json({success:false, message:"exam Not found"})
        }

        for (const key in updates)
        {
          if(updates.hasOwnProperty(key)){
            exam[key]=updates[key]
          }
        }

          await exam.save();
     
          // get full populated exam
          const updatedExam = await Exam.findOne({
            _id: examId,
          })
            .populate("category")
            .populate({
              path: "examPaper",
              populate: {
                path: "questions",
              },
            })
            .exec()
      


        res.status(200).json({
            success:true,
            message:"exam updated successfully",
            data:updatedExam,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to upadte exam ",
            error:error.message
          });
        
        
    }

}


// get the all examse 

exports.getAllExams = async (req, res)=>
{
    /*To get the All exams the required steps are below,

     1. By using find() method get all exam Details with send all parameter true and populate instructor
     2. Return positive response.
     3. Otherwise return negative response

     */

    try {

        // Get data from the exam 

         const  examdata = await Exam.find({},{
            examName:true,
            examPaper:true,
            category:true,
            institute:true,

         }).populate("examPaper").populate("category").
         populate("institute").exec();

        res.status(200).json({
            success:true,
            message:" All exam fetched successfully",
            data:examdata,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed to fetch all exam ",
          });
        
          
        }
        
      }

    
//delete course 
      
exports.deleteExam = async (req, res) => {

        try {
          const { examId } = req.body
      
          // Find the exam
          const exam = await Exam.findById(examId)
          if (!exam) {
            return res.status(404).json({ message: "exam not found" })
          }
      
          // // Unenroll students from the exam
          // const studentsEnrolled = exam.studentEnrolled
          // for (const studentId of studentsEnrolled) {
          //   await User.findByIdAndUpdate(studentId, {
          //     $pull: { exams: examId },
          //   })
          // }


      
          // Delete Papers and Questions
          
          const exampaper = exam.examPaper
          for (const paperId of exampaper) {
            // Delete sub-sections of the section
            const paper = await Paper.findById(paperId)
            if (paper) {
              const questions = paper.questions
              for (const questionId of questions) {
                await Question.findByIdAndDelete(questionId)
              }
            
      
            // Delete the section
            await Paper.findByIdAndDelete(paperId);
          }
        }
      
      
          // delete this exam from the catecory Schema 
          await Catagory.findByIdAndUpdate({_id:exam.category},{$pull: {exams:exam._id }})

          //delete the exam from the Institute
          await Institute.findByIdAndUpdate({_id:exam.institute},{$pull:{exams:exam._id}})
      
      
      
          // Delete the exam
          await Exam.findByIdAndDelete(examId)
      
          return res.status(200).json({
            success: true,
            message: "exam deleted successfully",
          })

        } catch (error) {
          console.error(error)
          return res.status(500).json({
            success: false,
            message: "Fail to delete Exam",
            error: error.message,
          })
        }
      }
    












// get full exam for with out logged user 
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { examId } = req.body
//     const courseDetails = await Course.findOne({
//       _id: examId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReview")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//           select: "-videoUrl",
//         },
//       })
//       .exec()

//     if (!courseDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${examId}`,
//       })
//     }

//     // if (courseDetails.status === "Draft") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: `Accessing a draft course is forbidden`,
//     //   });
//     // }

//     let totalDurationInSeconds = 0
//     courseDetails.courseContent.forEach((content) => {
//       content.subSection.forEach((subSection) => {
//         const timeDurationInSeconds = parseInt(subSection.timeDuration)
//         totalDurationInSeconds += timeDurationInSeconds
//       })
//     })

//     const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

//     return res.status(200).json({
//       success: true,
//       data: {
//         courseDetails,
//         totalDuration,
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// //get single course details for authenticate user 
exports.getFullExamDetails = async (req, res) => {
/*    Required steps to get course 
   1. Fetch id from body 
   2. Validate id
   3. By using findByIde() function find course 
   4. Apply the populate function on all filds that are stored with Object id  
   5. validate the course details 
   6. return response 
*/
    try {
            //get id
            const {examId} = req.body;
            // const userId = req.user.id;
            //find course details
           
            const examDetails = await Exam.findOne(
                                        {_id:examId})
                                        .populate({
                                            path:"examPaper",
                                            populate:{
                                                path:"questions",
                                                
                                            },
                                        })
                                        .exec();

                //validation
                if(!examDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${examId}`,
                    });
                }


                // calculating course progress count 
                // let courseProgressCount = await CourseProgress.findOne({
                //   examId:examId,
                //   userId:userId,
                // })

                // calculate the duration of course 
                // let totlalDurationInSeconds=0
                // courseDetails.courseContent.forEach((content)=>{
                //   content.subSection.forEach((subSection)=>{
                //     const timeDurationInSeconds= parseInt(subSection.duration)
                //     totlalDurationInSeconds += timeDurationInSeconds;
                //   })
                // })
                //  console.log(courseDetails.courseContent[0])
                // const d1 =  await Section.findById(courseDetails.courseContent[0]);
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:{examDetails,
                    // totalDuration,
                    // completedVideos:courseProgressCount?.completedVideos
                    // ?courseProgressCount?.completedVideos
                    // :[]
                  }
                   
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}



// // only instructor courses
// exports.getInstructorCourses = async (req, res) => {
//     try {
//       // Get the instructor ID from the authenticated user or request body
//       const instructorId = req.user.id
  
//       // Find all courses belonging to the instructor
//       const instructorCourses = await Course.find({
//         instructor: instructorId,
//       }).sort({ createdAt: -1 })
  
//       // Return the instructor's courses
//       res.status(200).json({
//         success: true,
//         data: instructorCourses,
//       })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({
//         success: false,
//         message: "Failed to retrieve instructor courses",
//         error: error.message,
//       })
//     }
//   }

//delete course 

  

  
  
