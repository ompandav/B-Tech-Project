import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../comman/IconBtn";
import { MdAddCircleOutline, MdNavigateNext } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { setExam, setEditExam, setStep } from "../../../../../slices/examSlice";
import { toast } from "react-hot-toast";
import NestedView from "./NestedView";
import {
  updatePaper,
  createPaper,
} from "../../../../../services/operations/examAPI";

export default function ExamBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editPaperId, setEditPaperName] = useState(null);
  const { exam } = useSelector((state) => state.exam);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // cancle the edit the section name
  const cancelEdit = () => {
    setEditPaperName(false);
    setValue("paperName","");
    setValue("duration", "");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editPaperId) {
      result = await updatePaper(
        {
          paperName: data.paperName,
          duration: data.duration,
          paperId: editPaperId,
          examId: exam._id,
          status:data?.public
        },
        token
      );
    } else {
      result = await createPaper(
        {
          paperName: data.paperName,
          duration: data.duration,
          examId: exam._id,
          status:data.public
        },
        token
      );
      console.log("r",result)
    }

    // console.log("result", result);

    if (result) {
      dispatch(setExam(result));
      setEditPaperName(null);
      setValue("paperName","");
      setValue("duration", "");
      setValue("public",false)
    }

    setLoading(false);
  };

  const goBack = () => {
    // here we reduse the step and set course edit value of slice is true
    // because when instructor go to back that time he/she edit the course
    dispatch(setStep(1));
    dispatch(setEditExam(true));
  };
  const goToNext = () => {
    // when you go to next step that time at list oone subsection is there in course
    // with out any subsection genareter we can't move ferther
    // also we check about the any section have not empty
    // that every section have atleast one subsection

    if (exam.examPaper.length === 0) {
      toast.error("Please add atleast one Paper ");
      return;
    }

    // check for subsection

    if (exam.examPaper.some((paper) => paper.questions.length === 0)) {
      toast.error("Please add atleast one question in each section");
      return;
    }

    // if every thingh is fine
    dispatch(setStep(3));
  };

  // when we click in nested Views button according to that input value and create button change
  const handleChangeEditPaper = (paperId, paperName, duration,status) => {
    //if the section is already there
    if (editPaperId === paperId) {
      cancelEdit();

      return;
    }
    setEditPaperName(paperId);
    setValue("paperName",paperName);
    setValue("duration", duration);
    setValue("public",status)

  };
  
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-400  p-6">
      <p className="text-2xl font-semibold text-richblack-5">Paper Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <div className=" flex  md:flex-row flex-col gap-5 justify-between ">
      <div className="flex flex-col space-y-2 w-full">
          <label htmlFor="" className="  lable-style">
            Paper Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectoionName"
            placeholder="Add Paper Name"
            {...register("paperName", { required: true })}
            className=" form-style w-full"
          />
          {errors.paperName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Paper name is required
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label htmlFor="" className="  lable-style">
             Duration <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectoionName"
            placeholder="Add Duration"
            {...register("duration", { required: true })}
            className=" form-style w-full"
          />
          {errors.duration && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Duration is required
            </span>
          )}
        </div>

      </div>
       
      <div className="my-6 mb-8">
        
        <label htmlFor="publc" className="inline-flex items-center text-lg">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
          />

          <span className="ml-2 text-richblack-400">
            Make this Paper as Public
          </span>
        </label>
      </div>

        <div className="flex items-end gap-x-4">
          {/* edit and create section button  */}
          <IconBtn
            type="submit"
            text={editPaperId ? "Edit Paper " : "Create Paper"}
            outline={true}
            customClasses={"text-white"}
          >
            <MdAddCircleOutline size={20} className="text-yellow-300" />
          </IconBtn>

          {/* cancel button  */}
          {editPaperId && (
            <button type="button" onClick={cancelEdit} className=" text-blue-500 p-2 border-richblack-5 border  rounded-md">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* /* check is there section field is present or not   */}
      {exam.examPaper.length > 0 && (
        <NestedView handleChangeEditPaper={handleChangeEditPaper} />
      )}

      {/* two buttons  */}
      <div className=" flex justify-end gap-x-3">
        <button
          type="button"
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn text={"Next"} onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
}
