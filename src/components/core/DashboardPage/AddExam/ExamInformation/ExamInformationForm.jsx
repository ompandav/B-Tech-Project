import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md"
import { toast } from "react-hot-toast";

import {
  fetchExamCategories,
  editExamDetails,
  addExamDetails,
} from "../../../../../services/operations/examAPI";
import { setExam, setStep } from "../../../../../slices/examSlice";
import IconBtn from "../../../../comman/IconBtn";
import { EXAM_STATUS } from "../../../../../utils/constants";


export default function ExamInformationForm() {
  // form hook
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Required Things

  const dispatch = useDispatch();
  const { exam, editExam } = useSelector((state) => state.exam);
  const { token,institute } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  // for option in form
  const [examCategories, setExamCotegories] = useState([]);

  // get course Category from backend
  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchExamCategories();
    if (categories.length > 0) {
      setExamCotegories(categories);
    }
    setLoading(false);
  };

  // to call external data and apies

  useEffect(() => {
    // when you edit the course that time you need the set all value
    if (editExam) {
      setValue("examName", exam?.examName);
      setValue("examCategory", exam?.category);
    }

    getCategories(); // get categoryy from server
  }, []);


  // check  for form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log(currentValues)
    // console.log(exam?.examName)
    // console.log(exam?.category)
    const name = currentValues?.examName
    const category = currentValues?.examCategory
    const eName = exam?.examName
    const eCategory = exam?.category

    // console.log(name)
    // console.log(category)
    // console.log(eName)
    // console.log(eCategory)

    if(name!==eName || category!==eCategory ) return true
    else return false
  };

  // submiting form
  const onSubmit = async (data) => {


    // form is on editiable  mode
    console.log(isFormUpdated())
        if (editExam) {
          // check for actualy form is updated

          if (isFormUpdated()) {

            const currentValues = getValues();
            const formData = new FormData();
            formData.append("examId", exam._id);
            formData.append("instituteId",institute._id)

            // check for all value of currentvalues if change then append in form
            if (currentValues.examName !== exam.examName) {
              formData.append("examName", data.examName);
            }
          
            if (currentValues.examCategory !== exam.category) {
              formData.append("category", data.examCategory);
            }
          

            // call the update course server api and add updated details
            setLoading(true);
            const result = await editExamDetails(formData, token);
            setLoading(false);

            if (result) {
              dispatch(setStep(2));
              // dispatch(setTrackCourseUpdate(!trackCourseUpdate))
              dispatch(setExam(result));
            } 
            else return
          
          }
          else {
            toast.error("No changes made to the form");
            return
          }
          return
        }

    // create course mode
    

    const formData = new FormData();
    formData.append("examName", data.examName);
    formData.append("category", data.examCategory);
    formData.append("instituteId",institute._id)
    formData.append("status",EXAM_STATUS.DRAFT)
    

    setLoading(true);
    const result = await addExamDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setExam(result));
      
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 "
      className="space-y-8  border-[0.12rem] border-richblack-400 rounded-lg lg:p-12 p-5 m-2"
    >
      {/* course title  */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className=" lable-style">
          {" "}
          Exam Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Exam Name"
          {...register("examName", { required: true })}
          className=" form-style w-full"
        />
        {errors.examName && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
           Exam name is Required{" "}
          </span>
        )}
      </div>

     
      {/* course category  */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className=" lable-style">
          {" "}
         Exam Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue={""}

          {...register("examCategory", { required: true })}
          className=" form-style w-full "
        >
          <option value={""} disabled className=" form-style text-richblack-300  ">
            Choose a Category
          </option>

          {!loading &&
            examCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>

        {errors.examCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Exam Category is Required{" "}
          </span>
        )}
      </div>


      

      {/* next button  */}
      <div className="flex flex-col md:flex-row justify-end gap-3">
        {editExam && (
          <button onClick={() => dispatch(setStep(2))}
          disabled={loading}
          className={`flex cursor-pointer items-center justify-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}

        <IconBtn text={!editExam ? "Next" : "Save Chnages"} type={"submit"} customClasses={" text-center justify-center"} >
        <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
