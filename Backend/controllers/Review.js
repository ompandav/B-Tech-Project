
const { default: mongoose } = require("mongoose");
const Review = require("../models/Review")
const Paper = require("../models/Paper")

exports.createReview =async (req,res)=>{
    
    try {

        /* 
          Required steps to created the rating 
          1. Get data from body
          2. Get user from req.user 
          3. Validate the data 
          4. Check user is enrolled for this paper 
          4. Check for user already reate for this paper 
          5. Create the entry in Data base 
          6. Update the paper schema with ratinh and review section 
          7. Send response 
        
        */


    
        //   1. Get data from body
        const {review, paperId}= req.body;
        console.log("rev",review)
        console.log(paperId)
       
        //   2. Get user from req.user 
        const userId = req.user.id;

        //   3. Validate the data 
        if(!review || !userId || !paperId)
        {
            return res.status(401).json({
                success:false,
                message:"Please fill all field required!!"
            });
        }

        // 4.  Check for user already reate for this paper 
        const alreadyReviewed = await Review.findOne({user:userId, paper:paperId});

         if (alreadyReviewed) {
         return res.status(403).json({
        success: false,
        message: "Paper already reviewed by user",
      })
    }
        // 5. Create the entry in Data base 
        const reviewData = await Review.create({
            review:review,
            user:userId,
            paper:paperId});

        //6. Update the paper schema with review section 
         await Paper.findByIdAndUpdate(paperId,{
            $push:{reviews:reviewData._id},
        },{new:true});

     

        //7. Send response 
        res.status(200).json({
            success:true,
            message:"Review Created successfully",
            reviewData
        })
        
    } catch (error) {
        console.log(error);
        return  res.status(500).json({
            success:false,
            message:"Failed to craete Reating and Review",
        })
        
    }
}


// get average rating  for perticular paper 

exports.averageRating = async (req,res)=>{
    try {
        /* 
        Required steps to caculate the average of rating 
        1. Get paper id from body
        2. Validate data.
        3. Calcute average by using the aggregate function
        4. Return average in responce
        */


        // 1. Get paper id from body
        const paperId = req.body.paperId;
        // 2. Validate data.
        if(!paperId){
            return res.status(404).json({
                success:false,
                message:"Invalid paper id "

            })

        }
        // 3. Calcute average by using the aggregate function
        // by using aggregate function we calculate the average reating for perticular paper 
        // aggregate function return output in the form of array 
        const result = await Reating.aggregate([
          {  
            //this match the all paper in reatinh and review schema 
            $match:{
                paper:new mongoose.Types.ObjectId(paperId),
            }
        },
        {
            // this group statement group the all ratings with same paper id and calculate the average of it 
            $group:{
                _id:null,
                averageRating:{$avg:"$reating"},

            }
        }
        ])

        // if reating is present for this paper the send it in response 
        if(result.length>0)
        {
            return res.status(200).json({
                success:true,
                message:"Avrage rating calculated successfuly ",
                averageRating:result[0].averageRating,
            })
        }

        // 4. Return average in responce
        return res.status(200).json({
            success:true,
            message:"No reating yet for this paper",
            averageRating:0// no reating present 
        })
        
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Failed to calculate the average raeating",
            
        })
        
    }
}


// get all reating Of perticular paper 
exports.paperRating = async (req,res)=>{
    try {
        /* 
        Required steps to caculate the average of rating 
        1. Get paper id from body
        2. Validate data.
        3. Find the all reating of given paper 
        4. Sort this with Decresing order and popolate user wiih perticular fields 
        5. If reating is present then return reatings 
        6. Return response.
        */


        // 1. Get paper id from body
        const paperId = req.body.paperId;
        // 2. Validate data.
        if(!paperId){
            return res.status(404).json({
                success:false,
                message:"Invalid paper id "

            })

        }

        const result = await Reating.find({paper:new mongoose.Types.ObjectId(paperId)})
                                                                                .sort({reating:"desc"})
                                                                                .populate({
                                                                                    path:"user",
                                                                                    select:"firstName, lastName, email, image",})

        // if reating is present for this paper the send it in response 
        if(result.length>0)
        {
            return res.status(200).json({
                success:true,
                message:" all reating for paper fetched successfuly ",
                rating:result,
            })
        }

        return res.status(200).json({
            success:true,
            message:"No reating yet for this paper",
            rating:0// only one element present in result array.
        })
        
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Failed to fetched reating for this paper ",
            
        })
        
    }
}



// get all reating of all paper 
exports.getAllReating = async (req,res)=>{
    try {

        /* 
        Required steps to get all rating 
        1. Get all reating by using find method 
        3. Return responce
        */
        

        // 1. Get all reating by using find method 

        const allReating = await Reating.find({})
                                        .sort({reating:"desc"})
                                        .populate({
                                            path:"user",
                                            select:"firstName lastName email image",
                                        })
                                        .populate({
                                            path:"paper",
                                            select:"paperName",
                                        }).exec()
                
  
            return res.status(200).json({
                success:true,
                message:"Fetched all reatings ",
                data:allReating

            })
        

        // 3. Return responce
        
    } catch (error) {
        console.log("")
        return res.status(404).json({
            success:false,
            message:"Failed to fetched all reatings"

        })
         
    }

}









