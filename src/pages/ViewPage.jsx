import React from "react";
import { useState } from "react";
import PaperDetails from "../components/core/ViewPaper/PaperDetails";
import PaperSidebar from "../components/core/ViewPaper/PaperSidebar";
import PaperReviewModal from "../components/core/ViewPaper/PaperReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFullDetailsOfPaper } from "../services/operations/examAPI";
import { useRef } from "react";
import {
  setEntirePaperData,
  setTotalQuestions,
} from "../slices/viewPaperSlice";

import { useParams } from "react-router-dom";

export default function ViewPage() {
  const [reviewModal, setReviewModal] = useState(false);
  const { paperId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  // function shuffleArray(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }



  // Fetch all required data at first render
  useEffect(() => {
    (async () => {
      const paperData = await getFullDetailsOfPaper(paperId, token);

      if (paperData) {
        // console.log("papedData",paperData)
        // paperData.questions = shuffleArray(paperData.questions);
        const totalQuestion = paperData?.questions?.length;
        dispatch(setEntirePaperData(paperData));
        dispatch(setTotalQuestions(totalQuestion));
       
      }
    })();
  }, []);

  // console.log("paper",paperEntireData)

  return (
    <>
      <div className=" relative flex   ">
        <PaperSidebar setReviewModal={setReviewModal} />

        <div className=" hidden md:block h-[100vh] flex-1 overflow-auto ">
          <div className="mx-auto w-full">
            <PaperDetails />
          </div>
        </div>
      </div>
      {reviewModal && <PaperReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
