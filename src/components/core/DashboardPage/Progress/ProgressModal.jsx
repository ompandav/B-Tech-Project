import React from "react";
import IconBtn from "../../../comman/IconBtn";

import { useSelector } from "react-redux";
import { VscChromeClose } from "react-icons/vsc";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3,7],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [3,8,6.8],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

// export function App() {
//   return <Line options={options} data={data} />;
// }
export default function ProgressModal({ progressModalData }) {

  const{user}=useSelector((state)=>state.profile)
  console.log(progressModalData);

  const chartData = {
    labels: progressModalData?.data.map(
      (attempt, index) => `Attempt ${index + 1}`
    ),
    datasets: [
      {
        label: "Score",
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        data: progressModalData?.data?.map((attempt) => attempt?.score),
      },
      {
        label: "Time Taken (minutes)",
        fill: false,
        borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
   
        borderWidth: 2,
        data: progressModalData?.data.map((attempt) => attempt?.timeRequired),
      },
    ],
  };

  const options = {
    responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Score And Time Taken Bar Chart',
        },
      },
    
    // title: {
    //   display: true,
    //   text: 'Line Chart Title',
    //   fontSize: 20,
    // },
    // legend: {
    //   display: true,
    //   position: 'center',
    // },
    // scales: {
    //     x: {
    //       type:'linear',
    //       categorySpacing: 20, // Adjust the spacing between categories as needed
    //     },
    //     y: {
    //       type:'linear',
    //       beginAtZero: true,
    //     },
    //   },
  };

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
  
 
  const bestPerformanceExam = calculateBestPerformance(progressModalData?.data);
  
  console.log('Best Performance Exam:', bestPerformanceExam);
  

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" relative w-10/12 rounded-lg border border-richblack-400 bg-richblack-900 py-6 flex flex-col items-center justify-center my-10 ">

      <div
      onClick={progressModalData?.btn1Handler}
       className=" absolute top-0 right-0 rounded-tr-lg p-2 text-richblack-100  hover:bg-pink-400 cursor-pointer ">
       <VscChromeClose  size={30}/>
      </div>
       {/* title  */}
        <p className=" mt-3 text-xl px-2 font-semibold text-richblack-100">
          {progressModalData.title}
        </p>

       {/* graph  */}
        <div className=" md:w-8/12 md:h-[400px] mt-5 flex items-center justify-center  rounded-lg border border-richblack-300 md:p-10 ">
          <Bar
            data={chartData}
            options={options}
            // width={100} 
            // height={50}
          />
        </div>

           
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
       

        <div className="  ">
          <IconBtn
            onclick={progressModalData?.btn1Handler}
            text={progressModalData.btn1Text}
          />
        </div>
      </div>
    </div>
  );
}
