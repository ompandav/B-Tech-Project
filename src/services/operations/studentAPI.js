
import { toast } from "react-hot-toast";
import { instituteEndpoints,  } from "../apis";
import { apiConnector } from "../apiconnector";


  
  const {
  ADD_STUDENT_API,
  GET_INSTITUTE_STUDENT_API,
  DELETE_INSTITUTE_STUDENT_API

}=instituteEndpoints


export const addStudent = async(data,token)=> {


let result = null;
  const toastId = toast.loading("Loading....");

  try {
    const response = await apiConnector("POST", ADD_STUDENT_API, data, {
      "Contenet-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_STUDENT_API RESPONSE ......", response);

    if (!response.data.success) {
      throw new Error("Could Not Add Course Details");
    }

    toast.success("Student Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_STUDENT_API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  
  }
  
export const getInstituteStudents = async(instituteId,token)=>
{
  
  
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST",GET_INSTITUTE_STUDENT_API ,{instituteId:instituteId},
    {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_INSTITUTE_STUDENT_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not get any courses");
    }
    // toast.success("Coursrs Fetched Successfully");
    result = response?.data?.data;
   
  } catch (error) {
    console.log("GET_INSTITUTE_STUDENT_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;

}

export const deleteInstituteStudent = async(data,token)=>
{
  
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("DELETE",DELETE_INSTITUTE_STUDENT_API,data,
    {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_INSTITUTE_STUDENT_API API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not get any courses");
    }
    toast.success("Student Deleted Successfully");
    
   
  } catch (error) {
    console.log("DELETE_INSTITUTE_STUDENT_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  

}

