import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../comman/IconBtn";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import PaperDetails from "./PaperDetails";
import toast from "react-hot-toast";

export default function PaperSidebar({ setReviewModal }) {
  const { paperId, questionId } = useParams();

  const { paperEntireData, totalQuestions, answered } = useSelector(
    (state) => state.viewPaper
  );
  const navigate = useNavigate();

  const setIsCurrent = (questionId) => {
    const currentQuestionIndex = paperEntireData?.questions.findIndex(
      (question) => question?._id === questionId
    );

    //  have next question

    if (currentQuestionIndex >= 0) {
      navigate(`/view-paper/${paperId}/question/${questionId}`);
    }
  };
  const isCurrent = (qId) => {
    if (qId === questionId) {
      return true;
    } else return false;
  };

  const isAnswered = (questionId) => {
    const index = answered?.findIndex((val) => val?._id === questionId);
    if (index >= 0) return true;
    else return false;
  };


  

  return (
    <>
      <div className=" flex  w-full h-[100vh] md:w-[260px] md:max-w-[320px] flex-col md:border-r-[1px] md:border-r-richblack-400 bg-richblack-900 md:bg-richblack-800">

      <div className="md:hidden bg-richblack-900 ">
            <PaperDetails />
          </div>

       

        <div className=" bg-richblack-900 md:bg-richblack-800">
         {/* Heading  */}
         <div className=" md:bg-richblack-800 md:my-2">
          <div className="md:mx-5 flex flex-col  justify-between gap-2 gap-y-4 md:border-b border-richblack-300 md:py-7 text-lg font-bold text-richblack-100">
            <div className="text-lg flex  items-center gap-3 justify-center">
              <p>Questions</p>
              <p className="text-sm font-semibold  text-caribbeangreen-300">
                {answered?.length} / {totalQuestions}
              </p>
            </div>
          </div>
        </div>
       

          {/* Questoios  */}
          <div className="h-[calc(100vh - 5rem)] overflow-y-auto   border-[1px] border-richblack-600 m-5  md:m-0 md:border-none ">
            <div className="  flex flex-wrap gap-4 mx-auto items-center justify-center p-5   ">
              {paperEntireData?.questions?.map((question, index) => (
                <div
                  key={index}
                  onClick={() => setIsCurrent(question?._id)}
                  className={` cursor-pointer flex text-[16px]  font-semibold items-center justify-center w-[30px] h-[30px]  rounded-full border border-richblack-500
                  ${
                    isCurrent(question?._id)
                      ? "bg-brown-300"
                      : isAnswered(question?._id)
                      ? " bg-caribbeangreen-500"
                      : " bg-pink-400"
                  }
                  
                  `}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
