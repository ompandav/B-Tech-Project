const BASE_URL = process.env.REACT_APP_BASE_URL;

// Auth Endpoints

export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
  
  
  
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const instituteEndpoints ={
  INSTITUTE_API:BASE_URL + "/institute/getInstitutes",
  CREATE_INSTITUTE_API :BASE_URL+"/institute/createInstitute",
  GET_INSTITUTE_EXAMS_FOR_STUDENT_API:BASE_URL+"/institute/getInstituteExamsStudent",
  GET_INSTITUTE_EXAMS_FOR_ADMIN_API:BASE_URL+"/institute/getInstituteExamsAdmin",
  GET_INSTITUTE_EXAMSHISTORY_API:BASE_URL+"/institute/getInstituteExamsHistory",
  GET_INSTITUTE_STUDENT_API:BASE_URL+"/institute/getInstituteStudents",
  DELETE_INSTITUTE_STUDENT_API:BASE_URL+ "/institute/deleteInstituteStudent",

  ADD_STUDENT_API :BASE_URL + "/auth/createStudent"
}

// Profile Endpoints
export const profileEndpoints = {
  CONTACT_US_API: BASE_URL + "/profile/contactUs",
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_STATISTICS_API:BASE_URL+"/profile/instructorDashboard"

};

// Setting Endpoints

export const settingsEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/profile/changePassword",
};


// Exam Endpoints 

export const examEndpoints ={
  
  EXAM_CATEGORIES_API : BASE_URL + "/exam/getCategories",

  CREATE_EXAM_API: BASE_URL + "/exam/createExam",
  UPDATE_EXAM_API: BASE_URL +"/exam/updateExam",
  DELETE_EXAM_API: BASE_URL + "/exam/deleteExam",
  GET_FULL_EXAM_API: BASE_URL + "/exam/getFullExamDetails",
  GET_EXAM_DETAILS_API:BASE_URL + "/exam/getExamDetails",

  CREATE_PAPER_API: BASE_URL + "/exam/createPaper",
  UPDATE_PAPER_API: BASE_URL + "/exam/updatePaper",
  DELETE_PAPER_API : BASE_URL + "/exam/deletePaper",
  GET_FULLPAPER_API:BASE_URL+"/exam/getFullPaperDetails",

  CREATE_QUESTION_API: BASE_URL + "/exam/createQuestion",
  UPDATE_QUESTION_API: BASE_URL + "/exam/updateQuestion",
  DELETE_QUESTION_API: BASE_URL + "/exam/deleteQuestion",

  LECTURE_COMPLETION_API: BASE_URL + "/exam/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/exam/createRating",



}

export const catalogData = {
  CATALOGPAGEDETAILS_API:BASE_URL + "/course/getCategoryPageDetails"
}



export const progressEndpoints= {
  CREATE_PROGRESS_API:BASE_URL+"/progress/createProgress",
  GET_STUDENT_PROGRESS_API:BASE_URL+"/progress/getStudetProgress",

  CREATE_REVIEW_API:BASE_URL+"/progress/createReview",
}