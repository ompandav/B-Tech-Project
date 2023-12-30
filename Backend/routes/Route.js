
// import 
const express = require("express");
const router = express.Router();

// import all handler 
const {login, createStudent} =require("../controllers/Auth");
const {createInstitute, getInstitutes, getInstituteExams, getInstituteStudents, deleteInstituteStudent, getInstituteExamsHistory, getInstituteExamsForStudent, getInstituteExamsForAdmin}= require("../controllers/Institute")
const { createCategory, getAllCategory } = require("../controllers/Category");


// import middleware 
const {auth, isStudent, isAdmin} = require("../middlewares/auth");
const { createExam, UpdateExam, deleteExam, getAllExams, getFullExamDetails } = require("../controllers/Exam");
const { createPaper, UpdatePaper, deletePaper, getFullPaperDetails } = require("../controllers/Paper");
const { createQuestion, updateQuestion, deleteQuestion } = require("../controllers/Question");
const { createExamProgress, getResentProgress, getStudentProgress } = require("../controllers/ExamPrgress");
const { createReview } = require("../controllers/Review");
const { updateProfile, changePassword } = require("../controllers/Profile");

//********************************************************************************************************************
//********************************************************************************************************************
//                                              USER ROUTER
//********************************************************************************************************************
//********************************************************************************************************************



//********************************************************************************************************************
//                                            Authentication routes
//********************************************************************************************************************

//User login 
router.post("/auth/login",login);

//User signUp
router.post("/auth/createStudent",auth , isAdmin,createStudent)


////  Institute

// create institute 
router.post("/institute/createInstitute", auth, isAdmin,createInstitute)

//getinstitute 
router.get("/institute/getinstitutes",auth,isAdmin,getInstitutes)

//get institute Exams for student
router.post("/institute/getInstituteExamsStudent",auth,isStudent,getInstituteExamsForStudent)
// get institute Exams for Admin
router.post("/institute/getInstituteExamsAdmin",auth,isAdmin,getInstituteExamsForAdmin)

// get institute Exams for History 
router.post("/institute/getInstituteExamsHistory",auth,getInstituteExamsHistory)

//get institute student 
router.post("/institute/getInstituteStudents",auth,isAdmin,getInstituteStudents)

// delete institute student 
router.delete("/institute/deleteInstituteStudent",auth,isAdmin,deleteInstituteStudent)


/////  Exam 

// create category 
router.post("/exam/createCategory",auth,isAdmin,createCategory)

// get category 
router.get("/exam/getCategories",getAllCategory)




// create Exam 
router.post("/exam/createExam",auth,isAdmin,createExam)

// update Exam
router.post("/exam/updateExam",auth,isAdmin,UpdateExam)

// get single exam 
router.post("/exam/getFullExamDetails",auth,getFullExamDetails)


// get all exams
router.get("/exam/getAllExams",getAllExams)

// delete exam 
router.delete("/exam/deleteExam",auth,isAdmin,deleteExam)





// create paper 
router.post("/exam/createPaper",auth,isAdmin,createPaper)

// update paper 
router.post("/exam/updatePaper",auth,isAdmin,UpdatePaper)

// delete paper 
router.delete("/exam/deletePaper",auth,isAdmin,deletePaper)

// get single paper 
router.post("/exam/getFullPaperDetails",auth,getFullPaperDetails)




// create Question 
router.post("/exam/createQuestion",auth,isAdmin,createQuestion)

// update paper 
router.post("/exam/updateQuestion",auth,isAdmin,updateQuestion)

// delete Question 
router.delete("/exam/deleteQuestion",auth,isAdmin,deleteQuestion)




///// progerss 

// craete progress
router.post("/progress/createProgress",auth,isStudent,createExamProgress);

// get single student Progess 
router.post("/progress/getStudetProgress",auth,getStudentProgress);

// get progress 

// get over all progess 


///// Review
// create review 
router.post("/progress/createReview",auth,isStudent,createReview)



///// profile 
// update profile 
router.post("/profile/updateProfile",auth,updateProfile)

// change password 
router.post("/profile/changePassword",auth,changePassword)




module.exports = router




