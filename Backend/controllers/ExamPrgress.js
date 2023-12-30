const ExamProgress = require("../models/ExamProgress");
const Progresses = require("../models/Progresses");
const User = require("../models/User")
const Paper = require("../models/Paper")
const mongoose = require("mongoose")


exports.createExamProgress = async (req ,res)=>{

    const {paperId,totalQuestion,timeRequired,score,answered,result,} = req.body;
    const userId = req.user.id;


    // check paper progress present in exam progress
    // if yes then update it 
    // if no create new 
    // create new progress 
    // add newly created progress in paper progress 
    // add newely progress in student's exam progress 

    try {

        if(!paperId || 
            !totalQuestion||
            !timeRequired||
            !score||
            !answered||
            !result
            )
            {
                return res.status(401).json({
                    success:false,
                    message:"Please fill all the fields"
                })
            }

        // create new progress 
        const newProgress = await Progresses.create({
           totalQuestion,
           timeRequired,
           score,
           answered,
           result,
        })




        // find the exam progress is there or not 
        const examProgress= await ExamProgress.findOne({
            paperId:paperId,
            userId:userId
        })

        // if exam progress not there
        if(!examProgress)
        {
           const newExamProgress = await ExamProgress.create({
                paperId,
                userId,
                progresses:newProgress._id
            });

            // add new progress in student exam progress 

            await User.findByIdAndUpdate({_id:userId},{

                $push:{
                    examProgress:newExamProgress._id,
                }
            })

            // add this student in paper as completed paper 
            await Paper.findByIdAndUpdate({_id:paperId},{
                $push:{
                    studentsCompleted:userId
                }
            })


        }
        else // exam progres is there 
        {
            examProgress.progresses.push(newProgress._id)
            examProgress.save()

        }

        res.status(200).json({
            success:true,
            message:"Exam Progress Stored Successfuly "
        })
           
    } catch (error) {
        console.error(error)
    return res.status(500).json({ error: "Internal server error" })
        
    }

}



exports.getStudentProgress = async(req,res)=>{
    try {


        // const userId = req.user.id;
        const {userId}=req.body
       

        if( !userId)
        {
            return res.status(401).json({
                success:false,
                message:"please fill required data "
            })
        }
    // const resentProgress= ExamProgress.aggregate([
    //         {
    //           $match: {
    //             // paperId: mongoose.Types.ObjectId(paperId), // Convert paperId to ObjectId
    //             // userId: mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
    //             paperId:paperId,
    //             userId:userId
    //           },
    //         },

    //         {
    //           $unwind: "$progresses",
    //         },


    //         {
    //           $lookup: {
    //             from: "progresses", // Collection name of Progresses
    //             localField: "progresses",
    //             foreignField: "_id",
    //             as: "progressDetails",
    //           },
    //         },


    //         {
    //           $unwind: "$progressDetails",
    //         },

    //         {
    //           $sort: {
    //             "progressDetails.submittedAt": -1, // Sort by submittedAt in descending order (latest first)
    //           },
    //         },

    //         {
    //           $limit: 1, // Limit to the most recent progress document
    //         },
    //       ]).exec()


        // const data=  ExamProgress.aggregate([
        //     {
        //       $match: {
        //         // paperId: mongoose.Types.ObjectId(paperIdToFind), // Convert paperId to ObjectId
        //         // userId: mongoose.Types.ObjectId(userIdToFind), // Convert userId to ObjectId
        //         paperId:paperId,
        //         userId:userId,

        //       },
        //     },
        //     {
        //       $unwind: "$progresses",
        //     },
        //     {
        //       $lookup: {
        //         from: "progresses", // Collection name of Progresses
        //         localField: "progresses",
        //         foreignField: "_id",
        //         as: "progressDetails",
        //       },
        //     },
        //     {
        //       $sort: {
        //         "progressDetails.submitedAt": -1, // Sort by submittedAt in descending order (latest first)
        //       },
        //     },
        //     {
        //       $limit: 1, // Limit to the most recent progress document
        //     },
        //   ]).exec()

   
          
        //   ((err, result) => {
        //     if (err) {
        //       console.error('Error:', err);
        //       return;
        //     }
          
        //     // The most recent Progress document is in the result variable
        //     if (result.length > 0) {
        //       const mostRecentProgress = result[0].progressDetails[0]; // Access the first element in the progressDetails array
        //       console.log('Most Recent Progress Document:', mostRecentProgress);
        //     } else {
        //       console.log('No Progress Document found for the specified criteria.');
        //     }
        //   });

     
    const data = await ExamProgress.find(
        {
            userId:userId
        }
        
    ).populate("paperId").
    populate("progresses")
    .populate({
        path:"userId",
    select:'name'})
    // console.log("data",data)
    if(!data)
    {
        return res.status(404).json({
            success:false,
            message:"Data not found"
        })
    }

    // let progressArray = data?.progresses;
    // progressArray.sort((a,b)=>a.submitedAt-b.submitedAt)
   
    //  console.log(progressArray.length)
     res.status(200).json({
        success:true,
        message:"Data fetch sucessFully",
        data:data
     })
        
        
    } catch (error) {
        console.error(error)
    return res.status(500).json({ error: "Internal server error" })
        
    }
}