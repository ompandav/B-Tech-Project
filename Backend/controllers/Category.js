const Category = require("../models/Category");
const mongoose = require("mongoose")

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }



exports.createCategory = async (req, res) =>{
    try {
        /*
        To create the category required steps 

        1. Fetch Data 
        2. validate 
        3. Create Entry in Database
        4. Return positive response.
        5. Otherwise return negative response
        
         */

        //fetch Data 
        const {name} = req.body;
        //validate 
        if(!name){
            return res.status(401).json({
                success: false,
                message: "Please fill all fields",
              });
            

        }

        //Create Entry in DB
        const category = await Category.create({
            name:name,
        });
        console.log(category);

        res.status(200).json({
            success:true,
            message:"category Entry Created Successfully",
        })

        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "category entry not created , please try again",
          });
        
        
    }
}

exports.getAllCategory = async (req,res)=>{
    try {
        /*To get all Category, The required steps are below,

     1. By using find() method get all course Details with send all parameter true and populate instructor
     2. Return positive response.
     3. Otherwise return negative response
     
     */

        //get data from category module 

        const  cataegory= await Category.find() 
        // data must have this name and the description parameter 

        res.status(200).json({
            success:true,
            message:"Data Get successfully ",
            cataegory,
        })


        
    } catch (error) {

        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Fail to fetch the data of cataegory",
          });
        
        
    }
}


// exports.categoryPageDetails = async (req, res) => {
//     try {
//       const { categoryId } = req.body
//       console.log("cate",categoryId)
//     //  const objectId = new mongoose.Types.ObjectId(categoryId);

  
//       // Get courses for the specified category
//       const selectedCategory = await Category.findById(categoryId)
//         .populate({
//           path: "course",
//           match: { status: "Published" },
//           populate: "ratingAndReview",
//         })
//         .exec()
  
//       // console.log("SELECTED COURSE", selectedCategory)
//       // Handle the case when the category is not found
//       if (!selectedCategory) {
//         console.log("Category not found.")
//         return res
//           .status(404)
//           .json({ success: false, message: "Category not found" })
//       }


//       // Handle the case when there are no courses
//       if (selectedCategory.course.length === 0) {
//         console.log("No courses found for the selected category.")
//         return res.status(404).json({
//           success: false,
//           message: "No courses found for the selected category.",
//         })
//       }
  
//       // Get courses for other categories
//       const categoriesExceptSelected = await Category.find({
//         _id: { $ne: categoryId },
//       })
//       let differentCategory = await Category.findOne(
//         categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//           ._id
//       )
//         .populate({
//           path: "course",
//           match: { status: "Published" },
//         })
//         .exec()
//       console.log()
  
      
//       // Get top-selling courses across all categories
//       const allCategories = await Category.find()
//         .populate({
//           path: "course",
//           match: { status: "Published" },
//           populate :{
//             path:"instructor"
//           }
//         })
//         .exec()
//       const allCourses = allCategories.flatMap((category) => category.course)
//       const mostSellingCourses = allCourses
//         .sort((a, b) => b.sold - a.sold)
//         .slice(0, 10)
  
//       res.status(200).json({
//         success: true,
//         data: {
//           selectedCategory,
//           differentCategory,
//           mostSellingCourses,
//         },
//       })
//     } catch (error) {

//         console.log(error)
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }