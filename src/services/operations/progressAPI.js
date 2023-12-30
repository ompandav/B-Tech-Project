import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";

import { progressEndpoints } from "../apis";

const {
    CREATE_PROGRESS_API,
    GET_STUDENT_PROGRESS_API,

}=progressEndpoints

//create the Exam progress 
export const createExamProgress  = async (data, token)=>{

    const toastId  = toast.loading("Loading....")
    try {
      const response = await apiConnector("POST", CREATE_PROGRESS_API, data, {
        "Contenet-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log(
        
        "Create progres  RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Exam Progress Saved")
  
    } catch (error) {
      console.log("CREATE_PROGRESS_API ERROR............", error)
      toast.error(error.response.data.message)
    
    }
    toast.dismiss(toastId)
  
  
  }


  export const getStudentProgress  = async (id,token)=>{
  let result=null;

    const toastId  = toast.loading("Loading....")
    try {
      const response = await apiConnector("POST",GET_STUDENT_PROGRESS_API,
    {userId:id},
      {
        Authorization: `Bearer ${token}`,
      })


      console.log(
        
        "GET STUDENT PROGRESS APT RESPONSE ............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
     
      result=response?.data?.data
  
    } catch (error) {
      console.log("GRT_STUDENT_PTOGRESS_API ERROR............", error)
      toast.error(error.response.data.message)
    
    }
    toast.dismiss(toastId)
  return result;
  
  }