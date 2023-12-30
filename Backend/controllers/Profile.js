

const User = require("../models/User");
const { response } = require("express");
const bcrypt = require("bcrypt");



exports.updateProfile = async (req, res)=>{
    try{
  /*  Rquired steps to update section

          1. Fetch data from body. 
          2. Validate the fetched data.
          3. User detail from req.user
          4. Get profile id from userDetails. 
          5. Get profile details using profile id 
          4. Update the Profile.
          5. Send positive response.
          6. Otherwise send negative response.
    */

    //Fetch data from body.

        
    const {name,contact,email,userId} = req.body;
 
  

    //Validate the fetched data.
    if (!name|| !contact || !email || !userId) {
     return res.status(401).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    //Get User detail from req.user 
    const userDetails = await User.findById(userId) ;

    if(!userDetails){
      return res.status(404).json({
        success:false,
        message:"user Not found"
      })
    }

    userDetails.name=name
    userDetails.contact=contact
    userDetails.email=email
    userDetails.save()

   
    // Send Positive response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update Profile ",
    });
  }
};


//delete the acount 
exports.deleteAccount = async (req, res)=>{
    try{ 

 /*  Rquired steps to delete section

          1. Get id from req.user.id
          2. Validate the fetched data.
          3. First of all delete the profile 
          4. Then delete count from total studend enrolled.
          5. Finaly delete the User acount 
          6. Send positive response.
          7. Otherwise send negative response.
    */

    //Fetch data from req.usr .
      
       const userId = req.user.id;
       console.log(userId);

    //    2. Validate the fetched data.
      const userDetails = await User.findById(userId);
      if(!userDetails)
      {
        return res.status(401).json({
            success:false,
            message:"user not found",
        })
      }

    //    3. First of all delete the profile 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
    /////// HW    4. Then delete count from total student enrolled.

    //    5. Finaly delete the User acount 
      const daletedAccount=  await User.findByIdAndDelete({_id:userId});
   
       // Send Positive response
       return res.status(200).json({
         success: true,
         message: "Acount deleted successfully",
        deleteAccount:this.deleteAccount
       });
     } catch (error) {
       console.log(error);
       return res.status(401).json({
         success: false,
         message: "Failed to delete acount",
       });
     }
   };
   
  // change Password  
   exports.changePassword = async (req, res)=>
   {
     try {
   
       /**
        required steps to change password 
        1. get password and conform password from req 
        2. validate data
        3. chack password and corrent password is match 
        4. hash the password 
        5. update the new password in database 
        6. send responce 
   
        */
   
        const {password, confirmPassword,userId} = req.body;
        
        if(!password || !confirmPassword || !userId)
        {
         return res.status(401).json({
           success:false,
           message: "Please enter password and confirmPassword both"
         })
        }
   
        if(password!==confirmPassword)
        {
         return response.status(401).json({
           success:false,
           message: "password and confirmPassword not match "
         })
        }
   
        const hashedPassword = await bcrypt.hash(password,10);
   
        const updatedUser = await User.findByIdAndUpdate({_id:userId},
         {password:hashedPassword},{new:true})
   
      
   
   
         res.status(200).json({
           success:true,
           message:"Password changed successfully"
         })
   
       
     } catch (error) {
   
       console.log(error)
       return res.status(500).json({
         success:false,
         message:"Fail to change Password"
       })
       
     }
   }

