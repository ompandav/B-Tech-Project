import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import ExamInformationForm from "./ExamInformation/ExamInformationForm";
import ExamBuilderForm from "./ExamBuilder/ExamBuilderForm";
import PublishForm from './PublishExam/index'

export default function RenderSteps() {
  const { step } = useSelector((state) => state.exam);

  const steps = [
    {
      id: 1,
      title: "Exam Information",
    },
    {
      id: 2,
      title: "Paper Builder"
    },
    {
      id: 3,
      title: "Publish Exam",
    },
  ];
  return (
    <div className=" text-richblue-100">
      {/* top lavels  */}
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item, index) => (

          <>
            <div className="flex flex-col items-center " key={index}>
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                        ${
                          step === item.id
                            ? " bg-yellow-800 border-yellow-200 text-yellow-200"
                            : " bg-richblack-700 border-richblack-200 text-richblack-200"
                        }
                        ${step > item.id && " bg-[#18a075] text-caribbeangreen-300"}`}
               
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-800" />
                ) : (
                  item.id
                )}
              </button>
            </div>

            {/* add dashed line here  */}
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-200" : "border-richblack-300"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      {/* headinngs */}

      <div className="relative mb-16 flex  select-none  justify-around md:gap-x-40 gap-x-7 md:mx-10 md:w-11/12">
        {steps.map((item) => {
          return (
            <div key={item.id}
             className="flex md:min-w-[130px] flex-col items-center gap-y-2">
              <p 
               className={`text-sm ${
                  step >= item.id ? "text-richblack-100" : "text-richblack-500 "
                }`}
              
              >{item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* related forms  */}
      <div>
        {step === 1 && <ExamInformationForm />}
        {step === 2 && <ExamBuilderForm/>}
        {step===3 && <PublishForm/>}
      </div>
    </div>
  );
}
