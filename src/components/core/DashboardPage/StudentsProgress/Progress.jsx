import React from "react";
import { useEffect } from "react";
import { getStudentProgress } from "../../../../services/operations/progressAPI";
import { useSelector } from "react-redux";
import { useState } from "react";
import { date, formattedDate } from "../../../../utils/dateFormater";
import ProgressModal from "../Progress/ProgressModal";
import TabularModal from "../Progress/TabularModal";
import { useNavigate, useParams } from "react-router-dom";

export default function MyProgress() {
  const { token } = useSelector((state) => state.auth);
//   const {user} = useSelector((state)=>state.profile)
const {studentId}= useParams()
  const [reverseProgress, setreverseProgress] = useState(null);
  const [progressModalData, setProgessModalData] = useState(null);
  const [tableModalData, setTableModalData] = useState(null);

  const [name, setName] = useState(false);
  useEffect(() => {
    const getProgress = async () => {
      const result = await getStudentProgress(studentId,token);
      if (result) {
        const reverseRes = result?.slice().reverse();
        setreverseProgress(reverseRes);
        setName(reverseRes[0]?.userId?.name)
      }
    };
    getProgress();
  }, []);

  console.log(reverseProgress)
//   console.log(reverseProgress[0]?.userId?.name)


  return (
    <div>
      <div className=" py-5">
       
        <h1 className="text-2xl font-bold text-richblack-5">
          {name}👋
        </h1>
        <p className="font-medium text-richblack-50">
          See progress of this student.
        </p>

        <div className=" my-10 flex flex-col gap-y-10 ">
          {!reverseProgress ? (
            <div className=" text-xl font-semibold text-richblack-50 text-center">
              No Progress Found
            </div>
          ) : (
            reverseProgress?.map((progress) => (
              <div key={progress?._id} >
                {/* one paper  */}
                <div className=" ">
                  
                  
                    {/* title part  */}
                    <div className=" rounded-t-xl  flex space-y-2  md:space-x-2  space-x-4 items-center md:justify-between md:px-8 px-3 py-4 bg-richblack-700 border border-richblack-300 ">
                      <div>
                        <p className=" text-richblack-25 text-2xl font-semibold ">
                          {progress?.paperId?.category} :{" "}
                          {progress?.paperId?.examName} :{" "}
                          {progress?.paperId?.paperName}
                        </p>
                        <p className=" text-richblack-50 ">
                          {" "}
                          Total Questions :{" "}
                          {progress?.progresses[0]?.totalQuestion}
                        </p>
                      </div>

                      <div className=" w-[60%] md:w-auto flex md:flex-row flex-col  gap-2"> 
                        <button
                          onClick={() => {
                            setProgessModalData({
                              title: `${progress?.paperId?.category} : ${progress?.paperId?.examName} : ${progress?.paperId?.paperName}`,
                              data: progress?.progresses,
                              btn1Text: "Close",
                              btn1Handler: () => setProgessModalData(null),
                            });
                          }}
                          className="  flex items-center justify-center transition-all duration-200 hover:scale-110  
                               bg-yellow-400 cursor-pointer rounded-md py-2 px-2 font-semibold text-richblack-800  border border-richblack-200"
                        >
                          Graph View
                        </button>
                        <button
                          onClick={() => setTableModalData({
                              title: `${progress?.paperId?.category} : ${progress?.paperId?.examName} : ${progress?.paperId?.paperName}`,
                              data:progress?.progresses,
                              btn1Text: "Close",
                              btn1Handler: () => setTableModalData(null),
                          })}
                          className="flex items-center justify-center transition-all duration-200 hover:scale-110  
                                bg-richblack-800 cursor-pointer gap-x-2 rounded-md py-2 px-2 font-semibold text-richblack-50 border border-richblack-200 "
                        >
                           View All
                        </button>
                      </div>

                    </div>

                    {/* all exam part  */}
                    <div className=" flex md:flex-col  rounded-xl">
                       {/* table head  */}
                      <div className=" rounded-bl-xl md:rounded-bl-none uppercase md:grid md:grid-cols-5    bg-richblack-800 border  md:px-4 w-[50%] md:w-full border-richblack-300 text-center text-sm font-medium  text-richblack-100 md:border-r-[0.07rem]   ">
                        <div className="md:border-r border-b md:border-b-0  border-richblack-300  py-3">
                          Most Resent
                        </div>
                        <div className="md:border-r border-b md:border-b-0 border-richblack-300  py-3">
                          Answered
                        </div>
                        <div className="md:border-r border-b md:border-b-0 border-richblack-300  py-3">
                          Score
                        </div>
                        <div className="md:border-r border-b md:border-b-0 border-richblack-300  py-3">
                          Time Taken
                        </div>
                        <div className=" py-3">Result</div>
                      </div>

                       {/* table data  */}
                      <div className="  md:rounded-b-xl rounded-br-xl grid md:grid-cols-5 border  md:px-4  border-richblack-300 text-center text-sm font-medium  text-richblack-100 border-r-[0.07rem]  w-full ">

                        <div className=" flex text-yellow-200  items-center justify-center space-x-1 border-b md:border-b-0 md:border-r  border-richblack-300  py-3">
                          <div className=" ">
                            {formattedDate(
                              progress?.progresses[
                                progress?.progresses?.length - 1
                              ]?.submitedAt
                            )?.date},
                          </div>
                          <div>
                            {formattedDate(
                              progress?.progresses[
                                progress?.progresses?.length - 1
                              ]?.submitedAt
                            )?.time}

                            </div>
                        </div>

                        <div className="border-b md:border-b-0  md:border-r  border-richblack-300  py-3">
                          {
                            progress?.progresses[
                              progress?.progresses?.length - 1
                            ]?.answered
                          }
                        </div>
                        <div className="border-b md:border-b-0 md:border-r  border-richblack-300  py-3">
                          {
                            progress?.progresses[
                              progress?.progresses?.length - 1
                            ]?.score
                          }
                        </div>
                        <div className="border-b md:border-b-0 md:border-r  border-richblack-300  py-3">
                          {
                            progress?.progresses[
                              progress?.progresses?.length - 1
                            ]?.timeRequired
                          }{" "}
                          min
                        </div>
                        <div className={`py-2`}>
                          <p
                            className={`ml-10 mr-6 rounded-md border border-richblack-600 py-1  ${
                              progress?.progresses[
                                progress?.progresses?.length - 1
                              ]?.result == "Pass"
                                ? "  bg-caribbeangreen-400 text-richblack-800"
                                : " bg-pink-400 text-richblack-800"
                            }`}
                          >
                            {" "}
                            {
                              progress?.progresses[
                                progress?.progresses?.length - 1
                              ]?.result
                            }
                          </p>
                        </div>
                  
                      </div>

                    </div>

                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {progressModalData ? (
        <ProgressModal progressModalData={progressModalData} />
      ) : (
        <div></div>
      )}
      {tableModalData ? (
        <TabularModal tableModalData={tableModalData} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
