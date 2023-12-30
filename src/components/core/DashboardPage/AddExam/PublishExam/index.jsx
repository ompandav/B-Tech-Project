import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../comman/IconBtn";
import { resetExamState, setStep } from "../../../../../slices/examSlice";
import { EXAM_STATUS } from "../../../../../utils/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editExamDetails } from "../../../../../services/operations/examAPI";

export default function PublishForm() {
  const { token } = useSelector((state) => state.auth);
  const { exam } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // if the coure os already publish that time
    //we set it value as true at first render
    if (exam?.status === EXAM_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToExam = () => {
    dispatch(resetExamState());
    navigate("/dashboard/my-exams");
  };

  const handleExamPublish = async () => {
    if (
      (exam?.status === EXAM_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (exam?.status === EXAM_STATUS.DRAFT && getValues("public") === false)
    ) {
      // no need to update in form
      // then you click on save button at that timee go to exam
      goToExam();
      return;
    }

    // if form updated

    const formData = new FormData();
    formData.append("examId", exam._id);
    const courseState = getValues("public")
      ? EXAM_STATUS.PUBLISHED
      : EXAM_STATUS.DRAFT;
    formData.append("status", courseState);

    setLoading(true);
    const result = await editExamDetails(formData, token);

    if (result) {
      goToExam();
    }
    setLoading(false);
  };
  const onSubmit = async () => {
    handleExamPublish();
  };
  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Publish Exam</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6 mb-8">
        
          <label htmlFor="publc" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />

            <span className="ml-2 text-richblack-400">
              Make this Exam as Public
            </span>
          </label>
        </div>
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text={"Save Change"} />
        </div>
      </form>
    </div>
  );
}
