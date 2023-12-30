import React from "react";

import IconBtn from "../../../comman/IconBtn";
import {  formattedDate } from "../../../../utils/dateFormater";
import { useSelector } from "react-redux";
import {VscChromeClose} from "react-icons/vsc"
 
export default function TabularModal({ tableModalData }) {
     
   
    const{user}= useSelector((state)=>state.profile)
    const revrseData = tableModalData?.data?.slice().reverse();
    const n= revrseData?.length;

    let bestPerformanceIndex=0

    function calculateBestPerformance(exams) {
      // Define weights (weights should add up to 1)
      const weightForScores = 0.7;
      const weightForTime = -0.2;
      const weightForQuestions = 0.5;
    
      // Calculate the maximum and minimum values for normalization
      const maxScore = Math.max(...exams.map((exam) => exam.score));
      const minScore = Math.min(...exams.map((exam) => exam.score));
      const maxTimeTaken = Math.max(...exams.map((exam) => exam.timeRequired));
      const minTimeTaken = Math.min(...exams.map((exam) => exam.timeRequired));
      const maxAttemptedQuestions = Math.max(...exams.map((exam) => exam.answered));
      const minAttemptedQuestions = Math.min(...exams.map((exam) => exam.answered));
    
      // Calculate the performance scores for each exam
      const performanceScores = exams.map((exam) => {
        const normalizedScore = (exam.score - minScore) / (maxScore - minScore) * 100;
        const normalizedTimeTaken = (exam.timeRequired - minTimeTaken) / (maxTimeTaken - minTimeTaken) * 100;
        const normalizedAttemptedQuestions = (exam.answered- minAttemptedQuestions) / (maxAttemptedQuestions - minAttemptedQuestions) * 100;
        return (weightForScores * normalizedScore) + (weightForTime * normalizedTimeTaken) + (weightForQuestions * normalizedAttemptedQuestions);
      });
    
      // Find the index of the exam with the highest performance score
       bestPerformanceIndex = performanceScores.indexOf(Math.max(...performanceScores));
    
      // Return the exam with the best performance
      return exams[bestPerformanceIndex];
    }
    
   
    const bestPerformanceExam = calculateBestPerformance(tableModalData?.data);
    
    // console.log('Best Performance Exam:', bestPerformanceExam);
    


  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm" >
      <div className=" relative w-11/12 rounded-lg border border-richblack-400 bg-richblack-900 p-6 flex flex-col items-center justify-center  gap-y-4 my-4">
      <div
      onClick={tableModalData?.btn1Handler}
       className=" absolute top-0 right-0 rounded-tr-lg p-2 text-richblack-100  hover:bg-pink-400 cursor-pointer ">
       <VscChromeClose  size={30}/>
      </div>

         {/* title  */}
        <p className=" mt-2 text-xl font-semibold text-richblack-100">
          {tableModalData.title}
        </p>

         {/* best performance  */}
        {bestPerformanceExam && (
          <div className="  items-center justify-center flex flex-col  border border-richblack-300 gap-1 gap-y-6  rounded-xl p-4 my-5">
            <p className=" text-base text-richblack-100 font-medium">
              Hi{" "}
              <span className=" text-richblack-400 font-bold  ">
                {user?.name.split(" ")[0]}
              </span>
              , your best performance is
            </p>



             <div className=" flex flex-col md:flex-row items-center justify-center gap-5 ">
             <div className="flex  gap-5  ">
             
             <div className=" flex flex-col  gap-y-1 items-center text-richblack-800">
                <div className=" bg-brown-400 font-bold rounded-full h-10 w-10 flex items-center justify-center">
                  {bestPerformanceIndex + 1}
                </div>
                <p className=" text-[12px] text-richblack-25">Attempt</p>
              </div>
              <div className=" flex flex-col  gap-y-1 items-center text-richblack-800">
                <div className=" bg-black font-bold rounded-full h-10 w-10 flex items-center justify-center">
                  {bestPerformanceExam?.totalQuestion}
                </div>
                <p className=" text-[12px] text-richblack-25">Questions</p>
              </div>
              <div className=" flex flex-col  gap-y-1 items-center text-richblack-800">
                <div className="  bg-richblue-600  font-bold rounded-full h-10 w-10 flex items-center justify-center">
                  {bestPerformanceExam?.answered}
                </div>
                <p className=" text-[12px] text-richblack-25">Answered</p>
              </div>

              
            </div>
            <div className=" flex gap-5">
            <div className=" flex flex-col  gap-y-1 items-center text-richblack-800">
                <div className="  bg-pink-600 font-bold rounded-full h-10 w-10 flex items-center justify-center">
                  {bestPerformanceExam?.score}
                </div>
                <p className=" text-[12px] text-richblack-25">Score</p>
              </div>
              <div className=" flex flex-col  gap-y-1 items-center text-richblack-800">
                <div className="   bg-richblack-400 font-bold rounded-full h-10 w-10 flex flex-col items-center justify-center text-[9px]">
                  <p>{bestPerformanceExam?.timeRequired}</p>
                  <p>min</p>
                </div>
                <p className=" text-[12px] text-richblack-25">Time Taken</p>
              </div>
              <div className=" flex flex-col  gap-y-1 items-center text-richblack-800">
                <div
                  className={`${
                    bestPerformanceExam?.result === "Pass"
                      ? " bg-caribbeangreen-400"
                      : " bg-pink-200"
                  } font-bold rounded-full h-10 w-10 flex items-center justify-center text-xs`}
                >
                  {bestPerformanceExam?.result}
                </div>
                <p className=" text-[12px] text-richblack-25">Result</p>
              </div>

              
            </div>

             </div>
           


          </div>
        )} 


    
       {/* table  */}
       <div className=" w-full">
       <div className=" uppercase md:grid md:grid-cols-5 hidden    bg-richblack-800 border  px-4  border-richblack-300 text-center text-sm font-medium  text-richblack-50 border-r-[0.07rem]   ">
          <div className="border-r  border-richblack-300  py-5">Attempt</div>
          <div className="border-r  border-richblack-300  py-5">Answered</div>
          <div className="border-r  border-richblack-300  py-5">Score</div>
          <div className="border-r  border-richblack-300  py-5">Time Taken</div>
          <div className=" py-5">Result</div>
        </div>

        {revrseData.map((val, index) => (

          <div key={index} className=" flex border-b-blue-300 border-b-[2px] md:border-none ">
            <div className=" md:hidden uppercase grid md:grid-cols-5   bg-richblack-800 border   border-richblack-300 text-center text-sm font-medium  text-richblack-100 border-r-[0.07rem]  w-full ">
              <div className="border-b  border-richblack-300  py-3">
                Attempt
              </div>
              <div className="border-b  border-richblack-300  py-3">
                Answered
              </div>
              <div className="border-b  border-richblack-300  py-3">Score</div>
              <div className="border-b  border-richblack-300  py-3">
                Time Taken{" "}
              </div>
              <div className=" py-3">Result</div>
            </div>




            <div className="  grid md:grid-cols-5 border  md:px-4  border-richblack-300 text-center text-sm font-medium  text-richblack-100 border-r-[0.07rem]  w-full ">
              <div className=" flex  items-center justify-center space-x-4 border-b md:border-b-0 md:border-r  border-richblack-300 py-[0.13rem]">
                <div>{n-index}</div>
                <div className=" flex flex-col md:flex-row text-yellow-200   justify-center space-x-1   border-richblack-300  text-[10px] md:text-sm">
                          <div>
                            {formattedDate(
                              val?.submitedAt
                            )?.date},
                          </div>
                          <div>
                            {formattedDate(
                              val?.submitedAt
                            )?.time}

                            </div>
                        </div>
              </div>
              <div className="border-b md:border-b-0  md:border-r  border-richblack-300  py-3">
                {val?.answered}
              </div>
              <div className="border-b md:border-b-0 md:border-r  border-richblack-300  py-3">
                {val?.score}
              </div>
              <div className="border-b md:border-b-0 md:border-r  border-richblack-300  py-3">
                {val?.timeRequired} min
              </div>
              <div className={`py-2`}>
                <p
                  className={`ml-10 mr-6 rounded-md border border-richblack-200 py-1 text-richblack-800  ${
                    val?.result == "Pass" ? " bg-caribbeangreen-400" : " bg-pink-400"
                  }`}
                >
                  {" "}
                  {val?.result}
                </p>
              </div>
            </div>
          </div>
        ))}

       </div>
      


      

        <div className="  ">
          <IconBtn
            onclick={tableModalData?.btn1Handler}
            text={tableModalData.btn1Text}
          />
        </div>

      </div>
    </div>
  );
}
