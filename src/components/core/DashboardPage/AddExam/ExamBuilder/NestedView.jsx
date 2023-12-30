import React from "react";

import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";


import { setExam } from "../../../../../slices/examSlice";
import ConfirmationModal from "../../../../comman/ConfirmationModal";
import QuestionModal from "./QuestionModal";
import { deleteQuestion,deletePaper } from "../../../../../services/operations/examAPI";


export default function NestedView({ handleChangeEditPaper }) {
  const { token } = useSelector((state) => state.auth);
  const { exam } = useSelector((state) => state.exam);

  // console.log(exam);
  const dispatch = useDispatch();

  const [addQuestion, setAddQuestion] = useState(null);
  const [viewQuestion, setViewQuestion] = useState(null);
  const [editQuestion, setEditQuestion] = useState(null);


  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  // delete paper handle
  const handleDeletePaper = async (paperId) => {
    const result = await deletePaper({
      paperId,
      examId: exam._id,
      token,
    });

    if (result) {
      dispatch(setExam(result));
    }
    // reset the confirmation modal
    setConfirmationModal(null);
  };

  const handleDeleteQuestion = async (questionId, paperId) => {
    const result = await deleteQuestion({
      questionId,
      paperId,
      token,
    });

    if (result) {
      const updatedexamPaper = exam.examPaper.map((paper) =>
        paper._id === paperId ? result : paper
      )
      const updatedexam = { ...exam, examPaper: updatedexamPaper }
      dispatch(setExam(updatedexam))
    }
    setConfirmationModal(null);
  };

  return (
    <div>
     <div
        className="rounded-lg bg-richblack-800 p-6 px-8"
        id="nestedViewContainer"
      >
        {exam.examPaper?.map((paper) => (
          <details key={paper._id} open>
            {/* paper part  */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              {/* paper heading and dropdown  */}
              
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-100">{paper.paperName}</p>
              </div>

              {/* edit and delete button  */}
              <div className="flex items-center gap-x-3">
                <button
                  onClick={()=>handleChangeEditPaper(
                    paper._id,
                    paper.paperName,
                    paper.duration,
                    paper?.status === "Published" ? true:false
                  )}
                >
                   <MdEdit className="text-xl text-richblack-300" />
                </button>

                <button
                  onClick={()=>setConfirmationModal({
                    text1: "Delete This paper?",
                    text2: "All the questions in this paper will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeletePaper(paper._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })}
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>

                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>


            {/* Subpaper Part  */}
            <div className="px-6 pb-4">

             {/* one sbsection  */}
              {paper.questions.map((data ,index) => (
               <div
                  key={data?._id}
                  onClick={() => setViewQuestion(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"  >


                  {/* // title  */}
                  <div className="flex items-center gap-x-3 py-2  text-richblack-200">
                  <p>Q {index+1}.</p>
                  <p className="font-semibold text-richblack-100">
                   {data.quest}</p>
                  </div>
           


                 {/* question add and delete buttom  */}
                  <div 
                  onClick={(e)=>e.stopPropagation()} // this is for not effecet of onclick of above main question div that is setViewpaper 
                  className=" flex  items-center gap-x-3">
                  <button
                  onClick={()=>setEditQuestion({...data,paperId:paper._id})}
                  >
                      <MdEdit className="text-xl text-richblack-300" />

                  </button>

                  <button
                  onClick={()=>setConfirmationModal({
                    text1: "Delete This question?",
                    text2: "Selected question will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () =>handleDeleteQuestion(data._id,paper._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })}
                >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>


                  </div>
                </div>
              ))}


              {/* add Question button  */}
              <button                
               className="mt-3 flex items-center gap-x-1 text-yellow-300"

              onClick={()=>setAddQuestion(paper._id)}
              
              >
              <FaPlus className=" text-lg"></FaPlus>
              <p>Add Question</p>

              </button>


            </div>

          </details>
        ))}
        
      </div>



      {/* Modal Display */}
      {addQuestion ? (
        <QuestionModal
          modalData={addQuestion}
          setModalData={setAddQuestion}
          add={true}
        />
      ) : viewQuestion ? (
        <QuestionModal
          modalData={viewQuestion}
          setModalData={setViewQuestion}
          view={true}
        />
      ) : editQuestion ? (
        <QuestionModal
          modalData={editQuestion}
          setModalData={setEditQuestion}
          edit={true}
        />
      ) : (
        <></>
      )}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}

      
    </div>
  );
}


