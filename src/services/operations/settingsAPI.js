import {toast} from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"




const {
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
   
} = settingsEndpoints




export function updateProfile (FormData,token)
{
return async (dispatch) =>{
    const toastId = toast.loading("Loading...")
    try {
       
        const response = await apiConnector (
            "POST" ,
             UPDATE_PROFILE_API, 
            FormData,
        { 
            "Contenet-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }
        );
       

        console.log(" UPDATE_PROFILE RESPONSE...................", response)

        if(!response.data.success)
        {
            throw new Error(response.data.message)
        }
        
        toast.success("Profile Updated Successfully")
        
        
    } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
        
    }
    toast.dismiss(toastId)


}
}

export function changePassword (token,formData){

    const toastId = toast.loading("Loading...")
    return async (dispatch)=>{
        try {

            const response = await apiConnector (
                "POST",
                CHANGE_PASSWORD_API,
                formData,
                {
                    "Contenet-Type": "multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            
            )

            console.log("CHANGED PASSWORD RESPONSE .............",response)

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }

            toast.success("Password Changed")
            
        } catch (error) {
            console.log("CHANGED_PASSWORDAPI ERROR............", error)
            toast.error("Could Not change Password")
            
        }
        toast.dismiss(toastId);
    }

}


