import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";

import { examEndpoints, instituteEndpoints, progressEndpoints } from "../apis";

const {
  EXAM_CATEGORIES_API,
  CREATE_EXAM_API,
  UPDATE_EXAM_API,
  DELETE_EXAM_API,

  GET_FULL_EXAM_API,
  GET_EXAM_DETAILS_API,

  CREATE_PAPER_API,
  UPDATE_PAPER_API,
  DELETE_PAPER_API,
  GET_FULLPAPER_API,
  

  CREATE_QUESTION_API,
  UPDATE_QUESTION_API,
  DELETE_QUESTION_API,

  LECTURE_COMPLETION_API,
 
  
  
} = examEndpoints;

const {
  GET_INSTITUTE_EXAMS_FOR_ADMIN_API,
  GET_INSTITUTE_EXAMS_FOR_STUDENT_API,
  GET_INSTITUTE_EXAMSHISTORY_API
}=instituteEndpoints

const { CREATE_REVIEW_API}=progressEndpoints


// fetch the avialable categories
export const fetchExamCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector("GET", EXAM_CATEGORIES_API);

    console.log("Course_Category_Api ......", response);

    if (!response.data.success) {
      throw new Error("Could Not Fetch Exam Categories");
    }
    result = response?.data?.cataegory;
  } catch (error) {
    console.log("EXAM_CATEGORY_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  return result;
};

// course details for unauthorize user 
export const getExamDetails= async (examId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "GET",
     GET_EXAM_DETAILS_API, 
      {
        examId,
      }
    )
    console.log("EXAM_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}


// course details for authentic user 
export const getFullDetailsOfExam= async (examId, token) => {
 
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
     GET_FULL_EXAM_API, 
      {
        examId
      }
      ,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("EXAM_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("EXAM_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}


// Create course
export const addExamDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading....");

  try {
    const response = await apiConnector("POST", CREATE_EXAM_API, data, {
      "Contenet-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_EXAM_API RESPONSE ......", response);

    if (!response.data.success) {
      throw new Error("Could Not Add Course Details");
    }

    toast.success("Exam Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_COURSE API ERROR............", error);
    toast.error("Can not create course");
  }
  toast.dismiss(toastId);
  return result;
};

// update course

export const editExamDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_EXAM_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete a Exam
export const deleteExam = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_EXAM_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Exam")
    }
    toast.success("Exam Deleted Successfully")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.response.data.message)
    // toast.success("Course Deleted ")

  }
  toast.dismiss(toastId)
}



//create Paper
export const createPaper = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_PAPER_API, data, {
     
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE Paper API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not create Paper");
    }
    toast.success("Course Paper Created");
    result = response?.data?.updatedExam ;
    console.log("res",result)
  } catch (error) {
    console.log("CREATE Paper API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

//update Paper
export const updatePaper = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_PAPER_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE Paper API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Paper");
    }
    toast.success("Paper Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE Paper API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete Paper
export const deletePaper = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_PAPER_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE Paper API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not delete Paper");
    }
    toast.success("Paper deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("Paper DELETE API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

// get Full details of Paper 
export const getFullDetailsOfPaper = async (paperId,token)=>{

  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
     GET_FULLPAPER_API, 
      {
        paperId
      }
      ,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("COURSE_FULL_PAPER_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("PAPER_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}




// create Paper 
export const createQuestion = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    console.log("Create Question data", data)
  
    const response = await apiConnector("POST",CREATE_QUESTION_API, data, {
      "Contenet-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE Question API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not create Question ");
    }
    toast.success("Question created");
    result = response?.data?.data;
    // result = fetchFullCourse(data.examId, token)
  } catch (error) {
    console.log("CREATE Question API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateQuestion = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST",UPDATE_QUESTION_API, data, {
      "Contenet-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE Question API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Question");
    }
    toast.success("Question Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE Question API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteQuestion = async (data,token)=>{

  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_QUESTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE Question API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not delete Paper");
    }
    toast.success("Question deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("Question DELETE API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;

}




export const fetchInstituteExamsStudent = async (instituteId,token) => {

  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST",GET_INSTITUTE_EXAMS_FOR_STUDENT_API ,{instituteId:instituteId},{
      Authorization: `Bearer ${token}`,
    });
    // console.log("GET INSTITUTE Exam API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not get any Exam");
    }
    // toast.success("Coursrs Fetched Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("GET INSTRUCTOR Exam API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const fetchInstituteExams = async (instituteId,token) => {

  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST",GET_INSTITUTE_EXAMS_FOR_ADMIN_API ,{instituteId:instituteId},{
      Authorization: `Bearer ${token}`,
    });
    // console.log("GET INSTITUTE Exam API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not get any Exam");
    }
    // toast.success("Coursrs Fetched Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("GET INSTRUCTOR Exam API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchInstituteExamsHistory = async (instituteId,token) => {

  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST",GET_INSTITUTE_EXAMSHISTORY_API ,{instituteId:instituteId},{
      Authorization: `Bearer ${token}`,
    });
    // console.log("GET INSTITUTE Exam API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not get any ExamHISTORY");
    }
    // toast.success("Coursrs Fetched Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("GET INSTRUCTOR ExamHISTORY API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};





// create review

export const createReview = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_REVIEW_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE Review API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Review")
    }
    toast.success("Review Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE Review API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return success
}

// Full course details fetched
export const fetchFullCourse  = async (examId, token)=>{
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "GET",
     GET_FULL_EXAM_API,
      {
        examId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
  
}
