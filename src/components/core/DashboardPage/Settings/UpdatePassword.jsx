import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../comman/IconBtn";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { changePassword } from "../../../../services/operations/settingsAPI";
import { useState } from "react";

export default function UpdatePassword({data}) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = async (fdata) => {
    try {
      const formData = new FormData();
      formData.append("password",fdata?.password)
      formData.append("confirmPassword",fdata?.confirmPassword)
      formData.append("userId",data?.id)
      dispatch(changePassword(token, formData));

      setValue("password","")
      setValue("confirmPassword","")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-100">Password</h2>

        <div className="flex flex-col gap-5 lg:flex-row">

       <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="password" className="lable-style ">
            Password
          </label>
          <input
             type={showNewPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter New Password"
            className=" form-style bg-richblack-700"
            {...register("password", {
              required: {
                value: true,
                message: "Please enter the new password",
              },
            })}
          />
           <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>


          {errors.password && <span  className="-mt-1 text-[12px] text-yellow-300">{errors.password.message}</span>}


        </div>





        <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="confirmPassword" className="lable-style ">
            Confirm Password
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm New Password"
            className=" form-style bg-richblack-700"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Please confirm password",
              },
            })}
          />
           <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
          

          {errors.confirmPassword && (
            <span  className="-mt-1 text-[12px] text-yellow-300">{errors.confirmPassword.message}</span>
          )}
        </div>
        
       </div>
      </div>

      <div className="flex justify-end gap-2">
        <IconBtn type={"submit"} text={"Update"}  />
      </div>
    </form>
  );
}
