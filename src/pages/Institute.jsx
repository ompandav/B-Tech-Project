import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createInstitutes, getInstitutes } from "../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../components/comman/IconBtn";
import CTAButton from "../components/comman/CTAButton";
import { useForm } from "react-hook-form";
import { setInstitute } from "../slices/authSlice";

export default function Institute() {
  const [instituteDetails, setInstituteDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [add, setAdd] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchInstitute = async () => {
      setLoading(true);
      const result = await getInstitutes(token);
      setInstituteDetails(result);
      setLoading(false);
    };

    fetchInstitute();
  }, [add]);


  const onSubmit= async(data)=>
  {
    const formData = new FormData()
    formData.append("name",data.name)
    formData.append("description",data.description)

    setLoading(true)
    const result = await createInstitutes(formData,token)
    setLoading(false);
    setAdd(false);
    setValue("name","")
    setValue("description","")
  }
 
  const setInstValue = (inst)=>{
    // console.log(typeof(inst))
    const data={_id:inst._id, name:inst.name}
    dispatch(setInstitute(data))
    localStorage.setItem("institute", JSON.stringify(data))


  }

  return (
    <div className="flex flex-col items-center justify-center pt-14 pb-5 gap-y-4  ">

      <div className=" font-bold text-3xl  text-richblack-5">Institutes</div>
      <div className=" border-richblack-700 border-[0.012rem] w-11/12"></div>

      <div className=" flex  mt-10 items-center justify-center ">
        {!instituteDetails ? (
          <div> Not institute are present</div>
        ) : (
          <div className=" flex flex-col  md:flex-row flex-wrap gap-10 p-6 bg-richblack-800 border-richblue-700 w-11/12 md:w-full  mx-10  rounded-lg   justify-center">
            {instituteDetails.map((inst, i) => (
              <div key={i} className="  flex flex-col gap-y-3 border-richblack-600 border-[0.08rem] p-5  rounded-lg md:w-[340px]  items-center">
                <div className=" text-2xl font-bold text-richblack-100">
                  {" "}
                  {inst.name}
                </div>
                <div className=" text-base text-richblack-300">
                 {inst.description}
                </div>
                <div onClick={()=>setInstValue(inst)}>
                <CTAButton active={true} linkTo={"/dashboard/my-exams"}>
                  Explore More
                </CTAButton>

                </div>
               
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setAdd(true)}
          className=" bg-richblack-800 text-center text-[16px] px-6 py-3 font-bold text-richblack-200
          hover:scale-95 transition-all duration-200  rounded-lg "
        >
          Add Institute
        </button>
      </div>

      {add && (
        
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8  border-[0.12rem] border-richblack-800 rounded-lg lg:p-12 p-5 m-2 "
          >
            {/* inst title  */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="courseTitle" className=" lable-style">
                {" "}
               Institute Name <sup className="text-pink-200">*</sup>
              </label>
              <input
                id="courseTitle"
                placeholder="Enter Institute Name"
                {...register("name", { required: true })}
                className=" form-style w-full"
              />
              {errors.name && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Institute name is Required{" "}
                </span>
              )}
            </div>

            {/* inst des  */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="courseShortDes" className=" lable-style">
                Inatitute Short Description <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseShortDes"
                placeholder="Enter Description "
                {...register("description", { required: true })}
                className=" form-style min-h-[130px] resize-x-none w-full"
              />
              {errors.description && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                Institute description is Required{" "}
                </span>
              )}
            </div>
            <div className=" flex justify-between">
            <button
          onClick={() => setAdd(false)}
          className=" bg-richblack-800 text-center text-[16px] px-6 py-3 font-bold text-richblack-200
    hover:scale-95 transition-all duration-200  rounded-lg "
        >
          Close
        </button>
            <IconBtn text={"Create"} type={"submit"} customClasses={" text-center"} ></IconBtn>
            </div>
          
          </form>
        
      )}

    </div>
  );
}
