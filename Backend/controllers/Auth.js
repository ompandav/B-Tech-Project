
//import 
const User = require("../models/User");
const Institute = require("../models/Institute")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// signUp
exports.createStudent= async (req,res)=>
{
    try {
        //data fetch fron request of body
        const {
        name,
        email,
        password,
        confirmPassword,
        contact,
        instituteId
    
         } =req.body;


         console.log(name);

        //validatation 
        if(!name|| !email || !password || !instituteId || !confirmPassword  || !contact){
            return res.status(401).json({
                success:false,
                message:"Fill all Fields Properly"
            })
        }


        if(password!==confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"password and confirm password not matching"
            })

        }
        //check user alrady exist 
        if(await  User.findOne({email})){
            return res.status(400).json({
                success:false,
                message:"User Already Register !!"
            })

        }
        

        //hash Password 
        const hashedPass = bcrypt.hash(password,10);

        
         //create entry in data base
        const userData = await User.create({
            name,
            email,
            contact,
            password:(await hashedPass).toString(),
            institute:instituteId 
        })

        // add student in institute
        await Institute.findByIdAndUpdate(instituteId,{
            $push:{students:userData._id}
        })

        //return responce 
        res.status(200).json({
            success:true,
            message:"User Registration Done Successfully", 
            userData
        })

        
    } catch (error) {

        console.log("Error occured whule register user :",error)
        res.status(500).json({
            success:false,
            message:error.message
        })
        
        
        
    }
}

//login
exports.login = async (req,res)=>{
    try {
        // get data from user
        const {email, password} =req.body;
        //validate data 
        if(!email || !password)
        {
            return res.status(401).json({
                success:false,
                message:"Fill all Fields Properly"
            });
            
        }


        // check user is exist or not 
        const user = await User.findOne({email}).populate({
            path: 'institute',
            select: 'name _id'
          });

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User doesn't exist"
            });
        }



        
        //generate jwt after password match 
        if(await bcrypt.compare(password,user.password)){

            const payload ={
                email:user.email,
                id:user._id,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{

                expiresIn:"24h"
            });


            
                //insert the token in user 
                user.token = token;
                //remove password from user instance in tocken 
                user.password=undefined;



                // // create cookie and send responce 

                const option={
                    expire:new Date(Date.now() + 3*24*60*60*1000), // 3days expire 
                    httpOnly:true
                 } 

                res.cookie("token",token,option).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"Logged in successfully"

                })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password doesn't match"
            });
        }


        

        
    } catch (error) {
        console.log("Login failure error :",error)
        return res.status(500).json({
            success:false,
            message:"Login failure , please try again",
        });
    }

}



