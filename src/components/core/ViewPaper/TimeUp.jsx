import React, { useState } from "react";
import IconBtn from "../../comman/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { createExamProgress } from "../../../services/operations/progressAPI";
import {
  addAnswred,
  addCorretAnswer,
  removeCorrectAnswer,
  setNoOfAnswered,
  setNoOfCorrectAns,
  setNoOfQuestion,
  resetPaper,
  setRquiredTime,
  setResult,
} from "../../../slices/viewPaperSlice";
import { useNavigate } from "react-router-dom";

export default function TimeUp({ modalData }) {

  const {
    totalQuestions,
    answered,
    correctAnswers,
    timeDuration,
  } = useSelector((state) => state.viewPaper);
  const dispatch = useDispatch()
  const {token} = useSelector((state)=>state.auth)
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()
  const setResultData = async (final, result) => {
    const formData = new FormData();
    formData.append("paperId", modalData?.paperId);
    formData.append("totalQuestion", totalQuestions);
    formData.append("timeRequired", final);
    formData.append("score", correctAnswers?.length);
    formData.append("answered", answered?.length);
    formData.append("result", result);
    setLoading(true);
    await createExamProgress(formData, token);
    setLoading(false);
  };
  const handleSubmit = async () => {
    

    console.log(correctAnswers?.length)
    let final=timeDuration
    let result = "Fail";

    if (correctAnswers?.length >= totalQuestions / 4) {
      result = "Pass";
    }

    setResultData(final, result);

    // totalQuestion,timeRequired,score,answered,result

    console.log("tq",totalQuestions)
    console.log("ad",answered?.length)
    console.log("ca",correctAnswers?.length)

    localStorage.setItem("noOfQue", JSON.stringify(totalQuestions));
    localStorage.setItem(
      "noOfCorrectAns",
      JSON.stringify(correctAnswers?.length)
    );
    localStorage.setItem("noOfAnswered", JSON.stringify(answered?.length));
    localStorage.setItem("reqTime", JSON.stringify(final));
    localStorage.setItem("result", JSON.stringify(result));

    dispatch(setNoOfQuestion(totalQuestions));
    dispatch(setNoOfAnswered(answered?.length));
    dispatch(setNoOfCorrectAns(correctAnswers?.length));
    dispatch(setRquiredTime(final));
    dispatch(setResult(result));

    dispatch(resetPaper());
    navigate(`/result/${modalData?.paperId}`);
  };

  console.log(answered)
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData.text2}
        </p>

        <div className="flex items-center justify-center gap-x-4 w-full">
          <IconBtn onclick={()=>handleSubmit()} text={modalData.btn1Text} />
        </div>
      </div>
    </div>
  );
}
