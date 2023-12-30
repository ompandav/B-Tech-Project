import React from "react";
import { useState } from "react";
import { useEffect,useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import ConfirmationModal from "../../comman/ConfirmationModal";
import { createExamProgress } from "../../../services/operations/progressAPI";
import TimeUp from "./TimeUp.jsx";

import audioFile from "../../../assets/Logo/audio.mp3"; 

export default function PaperDetails() {
  // required data
  const { paperId, questionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const {
    paperEntireData,
    totalQuestions,
    answered,
    correctAnswers,
    timeDuration,
  } = useSelector((state) => state.viewPaper);

  // required State
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [timeReminder,setTimeReminder]=useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);


  const START_MINUTES = timeDuration;
  const START_SECOND = "00";
  const START_DURATION = 10;

  const [currentMinutes, setMinutes] = useState();
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(null);


  useEffect(() => {
    setMinutes(timeDuration);
    startHandler();
  }, []);

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    // setMinutes(60 * 5);
    // setSeconds(0);
    setIsRunning(true);
  };
  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);
  };
  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    // course id section id or subsection id not present
    if (!paperId) {
      navigate("/dashboard/student-home");
    }

    const currentQuestionIndex = paperEntireData?.questions?.findIndex(
      (question) => question?._id === questionId
    );
    setQuestionData(
      currentQuestionIndex !== undefined ? paperEntireData?.questions[currentQuestionIndex] : null
      // paperEntireData?.questions[currentQuestionIndex]
      );
  }, [paperEntireData, location.pathname]);

  // required functions

  // const addCorretAnswer=(question)=>{

  //     const index =correctAnswers.findIndex((que)=>que===question)

  //     if(index>=0)
  //     {
  //         return;
  //     }

  //     correctAnswers?.push(question);

  //   }
  // const  removeCorrectAnswer=(question)=>{

  //     const index=correctAnswers.findIndex((que)=>que===question)

  //    if(index>=0)
  //    console.log("ind",index)
  //       correctAnswers.splice(index,1)
  //   }

  // const addAnswred=(question)=>{

  //      const index =answered.findIndex((que)=>que._id===question._id)

  //     if(index>=0)
  //     {
  //       // console.log("ind", index)
  //         answered[index].option=question.option
  //       // answered.splice(index,1)
  //       // answered.push(question)
  //         return
  //     }

  //     answered.push(question);
  //   }

  // helper Functions
  const goToNextQuestion = () => {
    const currentQuestionIndex = paperEntireData?.questions.findIndex(
      (question) => question?._id === questionId
    );

    //  have next question

    if (currentQuestionIndex !== totalQuestions - 1) {
      const nextQuestionId =
        paperEntireData?.questions[currentQuestionIndex + 1]?._id;
      navigate(`/view-paper/${paperId}/question/${nextQuestionId}`);
    } else {
      const firstIndex = paperEntireData?.questions[0]?._id;
      navigate(`/view-paper/${paperId}/question/${firstIndex}`);
    }
  };
  const getAnsweredOption = () => {
    const index = answered?.findIndex((val) => val?._id === questionId);
    const value = answered[index]?.option;

    // console.log("val",value)
    return value;
  };
  //get current question index
  const getIndex = () => {
    const index = paperEntireData?.questions?.findIndex(
      (que) => que?._id === questionId
    );
    return index + 1;
  };

  // validations functions
  const isPresentInCorrect = () => {
    const index = correctAnswers?.findIndex((val) => val === questionId);
    if (index >= 0) return true;
    else return false;
  };

  const isAnswered = () => {
    const index = answered?.findIndex((val) => val?._id === questionId);
    if (index >= 0) return true;
    else return false;
  };

  const isCorrect = (option) => {
    if (option === questionData?.correct) {
      return true;
    } else return false;
  };

 
  const setQuestionProps = (option) => {
    if (option) {
      if (isAnswered()) {
        const index = answered?.findIndex((val) => val?._id === questionId);
        const value = answered[index]?.value;
        // setSelectedOption(value);
        dispatch(addAnswred({ _id: questionId, option: option }));

        // not correct to correct
        if (!isPresentInCorrect()) {
          if (isCorrect(option)) {
            dispatch(addCorretAnswer(questionId));
          }
        }

        // correctd to incoreected // remove from corrected
        else {
          if (!isCorrect(option)) {
            dispatch(removeCorrectAnswer(questionId));
          }
        }
      } else {
        // console.log("option", option);

        dispatch(addAnswred({ _id: questionId, option: option }));

        if (isCorrect(option)) {
          dispatch(addCorretAnswer(questionId));
        }
      }

      goToNextQuestion();
    }
  };


  const setResultData = async (final, result) => {
    const formData = new FormData();
    formData.append("paperId", paperId);
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
  

      let final=timeDuration;
  
      const timeAt = parseFloat(currentMinutes) * 60 + parseFloat(currentSeconds);

    let remainingTimeInSeconds = timeDuration * 60 - timeAt;
    if (remainingTimeInSeconds <= 0) {
      remainingTimeInSeconds = 0; // Ensure it's not negative
    }
    
    const finalMinutes = Math.floor(remainingTimeInSeconds / 60);
    let finalSeconds = Math.ceil(remainingTimeInSeconds % 60);

    final = finalMinutes + finalSeconds / 100;
 
    
    if(final===0)
    {
      final=timeDuration
    }
    // const final = finalMinutes + finalSeconds / 100;

    // const final = differenceInMinutes + differenceInSeconds;

    console.log("final", final);

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
    navigate(`/result/${paperId}`);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    const audioElement = document.getElementById("audio-element");

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  };

  useEffect(() => {
    let audioPlayed = false; 
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
      
        if (--timer <= 0.1) {
          stopHandler()
          console.log("ats",answered?.length)
          
          setTimeIsUp({
            text1: "Time Up !!",
            text2:
              "Your entire current exam information will be recorded in progress.",
            btn1Text: "Submit",
            paperId:paperId,
            // btn1Handler: () => handleSubmit(),
            });

        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
        
        if (timer <=5* 60 && !audioPlayed) {
          setTimeReminder(true);
          toggleAudio();
          audioPlayed = true; // Set the flag to true so that audio won't play repeatedly
        }
       
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning,]);

 
  return (
    <div className="flex flex-col gap-5 text-white w-full ">
      {!questionData ? (
        <div> no exam </div>
      ) : (
        <div className=" flex flex-col items-center w-full ">
          {/* timer bar  */}
          <div className=" bg-richblack-800  flex flex-col md:flex-row gap-2
           w-full items-center justify-between
           py-5 md:px-10 px-5  border-b border-b-richblack-300">
          <div className=" text-2xl text-richblack-50 font-semibold">{paperEntireData?.category} : {paperEntireData?.examName} : {paperEntireData?.paperName}</div>
            <div className=" ">

            
              <div className={`flex gap-2 flex-col text-xl font-bold  items-center justify-center
              ${timeReminder ?" bg-pink-400":"bg-caribbeangreen-500"}  rounded-full w-[130px] h-[50px]
             `}>
            
                <div className=" flex gap-1 ">
                  {currentMinutes}
                  <span className="mx-1">:</span>
                  {currentSeconds}
                </div>
                
              </div>
            </div>
          </div>

          <div className="   w-full flex flex-col  gap-y-5 text-2xl md:px-5 px-3  pt-2 text-richblack-50">
            <div> Que {getIndex()} </div>

            <div className=" border border-richblack-300 p-5 rounded-lg shadow-2xl shadow-richblack-700 text-richblack-25">
              <div className=" text-2xl min-h-[120px] l"> {questionData?.quest}</div>
              <div className=" ml-4 flex  flex-col gap-y-5">
                {questionData?.options?.map((option, index) => (
                  <label
                    key={index}
                    htmlFor="publc"
                    className="inline-flex items-center text-2xl "
                  >
                    <div
                     className=" flex"
                    >
                      <input
                        type="radio"
                        name="option"
                        // id="public"
                        value={option}
                        checked={isAnswered() && getAnsweredOption() === option}
                        onChange={(e) => {
                          // setSelectedOption(e.target.value);
                          setQuestionProps(e?.target?.value);
                        }}
                        // onChange={handleOptionChange}
                        // onChange={handleOptionChange}
                        className=" h-6 w-6 rounded bg-richblack-300 text-richblack-50 cursor-pointer "
                        onClick={() => setQuestionProps()}
                      />
                    </div>

                    <span className="ml-5 text-richblack-100 text-2xl">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className=" w-full flex justify-center">
              <button
                disabled={loading}
                onClick={() => {
                  stopHandler();
                  setConfirmationModal({
                    text1: "Do you really want to Submit the exam?",
                    text2:
                      "Your entire current exam information will be recorded in progress.",
                    btn1Text: "Submit",
                    btn2Text: "Cancel",

                    btn1Handler: () => handleSubmit(),
                    btn2Handler: () => {
                      setConfirmationModal(null);
                      resumeHandler();
                    },
                  });
                }}
                title="Edit"
                className="  text-xl transition-all duration-200 hover:scale-110  text-richblack-900  bg-pink-400 font-semibold p-3 rounded-lg  border-[0.1rem] border-richblack-100"
              >
                End Exam
              </button>
            </div>
          </div>

        </div>
      )}


      <div>
      <audio id="audio-element" ref={audioRef} src={audioFile}></audio>
     
      </div>


      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
      {
        timeIsUp ? (<TimeUp modalData ={timeIsUp}/>):(<div></div>)
      }
    
    </div>
  );
}
