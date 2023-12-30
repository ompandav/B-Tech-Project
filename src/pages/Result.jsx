import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconBtn from "../components/comman/IconBtn"
import  {
  setEntirePaperData,
  setTotalQuestions,
  resetProgressData
} from "../slices/viewPaperSlice"
import { getFullDetailsOfPaper } from "../services/operations/examAPI";
import { useState } from "react";
import PaperReviewModal from "../components/core/ViewPaper/PaperReviewModal";

export default function Result() {
  const { noOfAnswered,noOfCorrectAns,noOfQuestion,requiredTime,result} = useSelector(
    (state) => state.viewPaper
  );
  const {token}= useSelector((state)=>state.auth)
  const {paperId} =useParams()
  const dispatch = useDispatch()
const navigate =useNavigate()
const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {

 let paperData
 const getPaperData=async()=>{
   paperData = await getFullDetailsOfPaper(paperId, token)

  if(paperData)
        {
          const totalQuestion = paperData?.questions.length
          dispatch(setEntirePaperData(paperData))
          dispatch(setTotalQuestions(totalQuestion))
        }

 }
   
 getPaperData()
    
    const handlePopstate = () => {
      console.log("paperData",paperData)
      
      // navigate("/dashboard/student-home")
      navigate(`/view-paper/${paperId}/question/${paperData?.questions[0]?._id}`);
    };

    window.addEventListener('popstate', handlePopstate);
    // Remove the event listener when the component unmounts
    // return () => {
    //   window.removeEventListener('popstate', handlePopstate);
    // };
  }, []);

  const resetScoreData = ()=>{
  
    localStorage.removeItem("noOfAnswered");
    localStorage.removeItem("noOfQue");
    localStorage.removeItem("noOfCorrectAns");
    localStorage.removeItem("reqTime");
    localStorage.removeItem("result");
    dispatch(resetProgressData())

  }

  
  
  // console.log(typeof(requiredTime))


  return (
    <div className=" flex items-center justify-center pt-10 ">

      <div className=" flex  flex-col gap-y-10   items-center justify-center border border-richblack-300 rounded-2xl p-10 m-7 bg-richblack-800 ">

        <p className=" text-3xl text-richblack-50 font-semibold  bg"> Exam Status </p>


        <div className="  grid md:grid-cols-6 grid-cols-2  gap-4 text-richblack-800 text-sm md:text-lg  ">

          <div className=" flex flex-col gap-y-3  items-center justify-center">
            <div className=" rounded-full w-20 h-20 text-2xl font-bold flex items-center justify-center bg-black  ">{noOfQuestion}</div>
            <p className=" text-richblack-5">Total Questions</p>
          </div>

          <div className=" flex flex-col gap-y-3   items-center justify-center text-center">
            <div className=" rounded-full w-20 h-20 text-2xl font-bold flex items-center justify-center  bg-richblue-500 ">{ noOfAnswered}</div>
            <p className=" text-richblack-5">Answered</p>
          </div>
          <div className=" flex flex-col gap-y-3 items-center justify-center">
            <div className=" rounded-full w-20 h-20 text-2xl font-bold flex items-center justify-center  bg-brown-400  "> {noOfQuestion-noOfAnswered}</div>
            <p className=" text-richblack-5">UnAnswered </p>
          </div>

          <div className=" flex flex-col gap-y-3 items-center justify-center">
            <div className=" rounded-full w-20 h-20 text-2xl font-bold flex items-center justify-center  bg-caribbeangreen-500 "> {noOfCorrectAns}</div>
            <p className=" text-richblack-5">Correct Answers</p>
          </div>

          <div className=" flex flex-col gap-y-3 items-center justify-center">
            <div className=" rounded-full w-20 h-20 text-2xl font-bold flex items-center justify-center bg-pink-700 ">{noOfAnswered - noOfCorrectAns} </div>
            <p className=" text-richblack-5">Wrong Answers</p>
          </div>
          <div className=" flex flex-col gap-y-3 items-center justify-center">
            <div className=" rounded-full w-20 h-20 text-2xl font-bold flex items-center justify-center bg-caribbeangreen-200 "> {noOfCorrectAns}</div>
            <p className=" text-richblack-5">score</p>
          </div>
        </div>
       
     
        <div className=" flex gap-3 flex-col w-full  md:flex-row items-center justify-center">
        <div className=" flex  w-full md:w-auto items-center gap-3 text-xl text-richblack-100 font-semibold  border border-richblack-300 p-4  rounded-xl   bg-richblue-700">
          <p className=" text-richblack-800">Time Taken :</p>
          <p className=" text-richblack-800">{requiredTime} min</p>
        </div>

        <div className={`flex  w-full md:w-auto justify-center  items-center gap-3 text-xl text-richblack-800 font-semibold  border border-richblack-300 p-4  rounded-xl 
        ${result==="Fail"?" bg-pink-400":" bg-caribbeangreen-400"}`}>
          <p> Result :</p>
          <p> {result} </p>
        </div>
        </div>

       


        <div className="w-full flex  items-center justify-center gap-7">
          {/* <IconBtn text={"Add Review"} customClasses={"text-black "} outline={true} onclick={()=>setReviewModal(true)} />  */}
          <button  onClick={()=> setReviewModal(true)
          }
          className="flex items-center transition-all duration-200 hover:scale-110  
          cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-100  bg-richblack-300 ">
           Add Review
          </button>

          <button  onClick={()=>{navigate("/dashboard/my-progress")
          resetScoreData()}
          }
          className="flex items-center transition-all duration-200 hover:scale-110  
          cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-800 bg-yellow-300 ">
           Close
          </button>
        </div>
      </div>

     { reviewModal && <PaperReviewModal setReviewModal={setReviewModal }/>

     }
    </div>
  );
}
