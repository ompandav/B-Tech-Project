import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../comman/IconBtn";
import toast from "react-hot-toast";

const gender = ["Male", "Female", "Non-Binary", "Prefer to not say", "Other"];

export default function EditProfile({data}) {
  // const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isFormUpdated = ()=>{
    const currentValues = getValues();
    console.log("cval",currentValues)
    if(currentValues.firstName!==data?.name?.split(" ")[0] ||
      currentValues.lastName!==data?.name?.split(" ")[1] ||
       currentValues.email !==data?.email ||
       currentValues.contact!==data?.contact)
       {
        return true
       }
       else return false 
  }

  const submitProfileForm = async (fdata) => {

    if(isFormUpdated())
    {
      const formData= new FormData()
      console.log(fdata)

      formData.append("name",fdata?.firstName + " " + fdata?.lastName)
      formData.append("email",fdata?.email)
      formData.append("contact",fdata?.contact)
      formData.append("userId",data?.id)

      try {
        console.log(data);
        dispatch(updateProfile(formData,token));
      } catch (error) {
        console.log("FORM SUBMIT ERROR .........", error.message);
      }

    }
    else
    {
      toast.error("Please update atleast one value")
    }

   
  };

  console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* profile update  */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-100">
            Profile Information
          </h2>

          {/* first name and last name  */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* first  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style bg-richblack-700 "
                readOnly={data?.role!=="Admin"}
                
                {...register("firstName", { required: true })}
                defaultValue={data?.name?.split(" ")[0]}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>

            {/* last name  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-style bg-richblack-700"
                {...register("lastName", { required: true })}
                readOnly={data?.role!=="Admin"}
                defaultValue={data?.name?.split(" ")[1]}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          {/* contact and about  */}


          <div className="flex flex-col gap-5 lg:flex-row">
           
           {/* email  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
               Email
              </label>

              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style bg-richblack-700"
                readOnly={data?.role!=="Admin"}
                {...register("email", { required: true })}
                defaultValue={data?.email}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Email.
                </span>
              )}
            </div>
            {/* contact  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contact" className="lable-style">
                Contact Number
              </label>

              <input
                type="tel"
                name="contact"
                id="contact"
                placeholder="Enter Contact Number"
                className="form-style bg-richblack-700"
                readOnly={data?.role!=="Admin"}
                {...register("contact", {
                  required: {
                    value: true,
                    message: "Please enter your contact Number",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={data?.contact}
              />
              {errors.contact && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contact.message}
                </span>
              )}
            </div>

            
          </div>
        </div>

        {/* two buttons  */}
        {
          data?.role==="Admin" &&
          <div className="flex justify-end gap-2">
          
          <IconBtn type="submit" text={"Update"}></IconBtn>
        </div>
        }
        
      </form>
    </div>
  );
}
