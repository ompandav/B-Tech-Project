
import { toast } from "react-hot-toast"

import { setLoading, setToken,setInstitute } from "../../slices/authSlice"

import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { authEndpoints, instituteEndpoints } from "../apis"
import { ADMIN } from "../../utils/constants"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESET_PASSWORD_TOKEN_API,
  RESET_PASSWORD_API,
} = authEndpoints

const {
  
  INSTITUTE_API,
  CREATE_INSTITUTE_API
}=instituteEndpoints


export const getInstitutes = async (token)=>
{
  let result = [];

  try {
    const response = await apiConnector("GET", INSTITUTE_API,
    null,
    
      {
        Authorization: `Bearer ${token}`,
      }
    
    );
    console.log("GETINSTITUTE API RES......", response);

    if (!response.data.success) {
      throw new Error("Could Not Fetch Institute");
    }
    result = response?.data?.instituteData;
  } catch (error) {
    console.log("GET Institute API ERROR............", error);
    toast.error(error.response.data.message);
  }
  return result;
}


export const createInstitutes = async (data,token)=>
{
  let result = [];

  try {
    const response = await apiConnector("POST", CREATE_INSTITUTE_API,
    data,
      {
        "Contenet-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    
    );
    console.log("GETINSTITUTE API RES......", response);

    if (!response.data.success) {
      throw new Error("Could Not Fetch Institute");
    }
    result = response?.data?.instituteData;
  } catch (error) {
    console.log("GET Institute API ERROR............", error);
    toast.error(error.response.data.message);
  }
  return result;
}



export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email, password, navigate) {
  return async (dispatch) => {

    // display loding toast on screen while the not get respomse fron the backend  and store its id 
    const toastId = toast.loading("Loading...")
    // set loading true 
    dispatch(setLoading(true))

    try {

      // call the api connector function of services 
      // and send the request to server (backend) with required parameter 
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      // if response not get then throw error
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      console.log(response)
      // when get successfull response 
      toast.success("Login Successful")

      // set the token for ferther uses
      dispatch(setToken(response.data.token))

      // this is for the profile image of user if present in image otherwise create and set in useer info
      const userImage = response.data?.user?.image
      dispatch(setUser({ ...response.data.user, image: userImage }))

      //set the institute of student 
      const emailId = response?.data?.user?.email
      console.log(emailId)
      console.log(process.env.EMAIL)
       if(emailId!==process.env.EMAIL)
      {
        const data={_id:response?.data?.user?.institute?._id, name:response?.data?.user?.institute?.name}
        console.log(data)
      dispatch(setInstitute(data))
      localStorage.setItem("institute", JSON.stringify(data))


      }
      
      // set the localStorage in that set the reciveded token with convert into string fron the response
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      // end of above all process navigate to dash board my profile section 
      email===ADMIN.EMAIL?
      navigate("/institute"):navigate("/dashboard/student-home")
      // navigate("/")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      console.error(error);
    

      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}





export function getPasswordResetToken(email, setEmailSent)
{
  return async (dispatch)=>{
    dispatch(setLoading(true))
   
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API,{email});

      console.log("RESET PASSWORD RESPONSE..........",response)
    
      if(!response.data.success)
      {
        throw new Error(response.data.message)
      }

      toast.success("Reset  Email Sent")
      setEmailSent(true);

    } catch (error) {

      console.log("RESET PASSWORD TOKEN ERROR .........",error)
      
    }
    dispatch(setLoading(false));
  }

}


export function resetPassword (password, confirmPassword, token )
{
  return async (dispatch)=>{
    dispatch(setLoading(true));
    try {
      
      const response = await apiConnector("POST", RESET_PASSWORD_API,{password,confirmPassword,token});
      console.log("RESET PASSWORD RESPONSE.....",response);

      if(!response.data.success)
      {
        throw new Error("RESET PASSWORD ERRPR",response.data.error)
      }
      toast.success("Password has been reset successfully")
    } catch (error) {
      
      console.log("RESET PASSWORD ERROR .........",error);
      toast.error(error.response.data.message)

      
    }
    dispatch(setLoading(false));
  }

}