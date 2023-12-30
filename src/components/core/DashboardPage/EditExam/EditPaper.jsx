import React from "react";

import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import IconBtn from "../../../comman/IconBtn";
import ConfirmationModal from "../../../comman/ConfirmationModal";
import QuestionModal from "../AddExam/ExamBuilder/QuestionModal";
import {
  deleteQuestion,
  getFullDetailsOfPaper,
  updatePaper,
} from "../../../../services/operations/examAPI";
import { useForm } from "react-hook-form";
import { MdAddCircleOutline} from "react-icons/md";

export default function EditPaper() {
  const { paperId ,examId} = useParams();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [paper, setPaperData] = useState(null);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const [addQuestion, setAddQuestion] = useState(null);
  const [viewQuestion, setViewQuestion] = useState(null);
  const [editQuestion, setEditQuestion] = useState(null);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  // on frist render fetch the full exam details and set in exam slice
  const populatPaperDetails = async () => {
    setLoading(true);
    // console.log("examId",examId)
    // const result = await fetchFullexam(examId,token);
    const result = await getFullDetailsOfPaper(paperId, token);
    if (result) {
      setPaperData(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    populatPaperDetails();
  }, []);

  const cancelEdit = () => {
    setValue("paperName", "");
    setValue("duration", "");

    setEdit(false)
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (paperId) {
      result = await updatePaper(
        {
          paperName: data.paperName,
          duration: data.duration,
          paperId: paperId,
          examId: examId,
          status:data.public
        },
        token
      );
    }

    // console.log("result", result);

    if (result) {
      setValue("paperName", "");
      setValue("duration", "");
    }

    setLoading(false);
    setEdit(false)
    populatPaperDetails()
  };

  // when we click in nested Views button according to that input value and create button change
  const handleChangeEditPaper = (paperId, paperName, duration,status) => {
    // //if the section is already there
    // if (paperId === paperId) {
    //   cancelEdit();

    //   return;
    // }

    setValue("paperName", paperName);
    setValue("duration", duration);
    setValue("public",status)
  };

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleDeleteQuestion = async (questionId, paperId) => {
    const result = await deleteQuestion({
      questionId,
      paperId,
      token,
    });

    populatPaperDetails();
    setConfirmationModal(null);
  };

  return (
    <div>
      <div>
        <h1 className="mb-14 text-center text-4xl font-bold text-richblack-100">
          Edit Paper{" "}
        </h1>
        <div>
        {
          edit && ( 
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-richblack-300  p-10 mb-10 rounded-xl">

            <div className=" flex  md:flex-row flex-col gap-5 justify-between ">
      <div className="flex flex-col space-y-2 w-full">
          <label htmlFor="" className="  lable-style">
            Paper Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectoionName"
            placeholder="Add Paper Name"
            {...register("paperName", { required: true })}
            className=" form-style w-full"
          />
          {errors.paperName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Paper name is required
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label htmlFor="" className="  lable-style">
             Duration <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectoionName"
            placeholder="Add Duration"
            {...register("duration", { required: true })}
            className=" form-style w-full"
          />
          {errors.duration && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Duration is required
            </span>
          )}
        </div>

      </div>
       
      <div className="my-6 mb-8">
        
        <label htmlFor="publc" className="inline-flex items-center text-lg">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
          />

          <span className="ml-2 text-richblack-400">
            Make this Paper as Public
          </span>
        </label>
      </div>
          

            <div className="flex  justify-between items-center">
            <IconBtn
            type="submit"
            text={ "Edit Paper "}
            outline={true}
            customClasses={"text-yellow-300 transition-all duration-200"}
          >
            {/* <MdAddCircleOutline size={1} className="text-yellow-300" /> */}
          </IconBtn>
              {/* cancel button  */}
              {paperId && (
                
                <button type="button" onClick={cancelEdit} className=" text-richblack-200 hover:scale-95 transition-all duration-200 text-center text-[16px] font-bold border-richblue-300 border py-2 px-5 rounded-md">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>)

        }
         
        </div>
        {paper ? (
          <div
            className="rounded-lg bg-richblack-800 p-6 px-8"
            id="nestedViewContainer"
          >
            <details open>
              {/* paper part  */}
              <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                {/* paper heading and dropdown  */}

                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu className="text-2xl text-richblack-50" />
                  <p className="font-semibold text-richblack-100">
                    {paper?.paperName}
                  </p>
                </div>

                {/* edit and delete button  */}
                
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() => {
                      handleChangeEditPaper(
                        paper._id,
                        paper.paperName,
                        paper.duration,
                        paper?.status==="Published"?true:false
                      );
                      setEdit(true);
                    }}
                  >
                    <MdEdit className="text-xl text-richblack-300" />
                  </button>
                  <span className="font-medium text-richblack-300">|</span>
                  <AiFillCaretDown className={`text-xl text-richblack-300`} />
                </div>
              </summary>

              {/* Subpaper Part  */}
              <div className="px-6 pb-4">
                {/* one sbsection  */}
                {paper?.questions.map((data, index) => (
                  <div
                    key={data?._id}
                    onClick={() => setViewQuestion(data)}
                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                  >
                    {/* // title  */}
                    <div className="flex items-center gap-x-3 py-2 ">
                      <p className=" text-richblack-50">Q {index + 1}.</p>
                      <p className="font-semibold text-richblack-50">
                        {data.quest}
                      </p>
                    </div>

                    {/* question add and delete buttom  */}
                    <div
                      onClick={(e) => e.stopPropagation()} // this is for not effecet of onclick of above main question div that is setViewpaper
                      className=" flex  items-center gap-x-3"
                    >
                      <button
                        onClick={() =>
                          setEditQuestion({ ...data, paperId: paper._id })
                        }
                      >
                        <MdEdit className="text-xl text-richblack-300" />
                      </button>

                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete This question?",
                            text2: "Selected question will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteQuestion(data._id, paper._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      >
                        <RiDeleteBin6Line className="text-xl text-richblack-300" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* add Question button  */}
                <button
                  className="mt-3 flex items-center gap-x-1 text-yellow-300"
                  onClick={() => setAddQuestion(paper._id)}
                >
                  <FaPlus className=" text-lg"></FaPlus>
                  <p>Add Question</p>
                </button>
              </div>
            </details>
          </div>
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            exam Not Foud
          </p>
        )}
      </div>

      {/* Modal Display */}
      {addQuestion ? (
        <QuestionModal
          modalData={addQuestion}
          setModalData={setAddQuestion}
          add={true}
          forPaperEdit={true}
          populatPaperDetails={populatPaperDetails}
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
          forPaperEdit={true}
          populatPaperDetails={populatPaperDetails}
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
