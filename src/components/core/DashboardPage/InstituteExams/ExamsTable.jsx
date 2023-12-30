import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { EXAM_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../comman/ConfirmationModal";
import { useEffect } from "react";
import {
  deleteExam,
  fetchInstituteExams,
  deletePaper,
} from "../../../../services/operations/examAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { setStep } from "../../../../slices/examSlice";
export default function ExamTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, institute } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [examsDetails, setExamsDetails] = useState([]);
  const [fetch, setFetch] = useState(false);

  const fetchExams = async () => {
    const result = await fetchInstituteExams(institute._id, token);
    // console.log(result);
    if (result) {
      setExamsDetails(result);
    }
  };
  useEffect(() => {
    fetchExams();
  }, [fetch]);

  const handleExamDelete = async (examId) => {
    setLoading(true);
    // delete the paper
    await deleteExam({ examId: examId }, token);

    setConfirmationModal(null);
    setLoading(false);
    setFetch(!fetch);
  };

  const handleDeletePaper = async (paperId, examId) => {
    setLoading(true);
    const result = await deletePaper({
      paperId,
      examId: examId,
      token,
    });
    setConfirmationModal(null);
    setLoading(false);
    setFetch(!fetch);
  };

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // console.log("exams", examsDetails);
  return (
    <div>
      <div>
        {examsDetails?.exams?.length === 0 ? (
          <div className="grid flex-1 place-items-center text-2xl text-richblack-200 ">
            No Exam Avialable in Institute
          </div>
        ) : (
          examsDetails?.exams?.map((exam) => (
            <div key={exam._id} className=" flex flex-col  pb-16 ">
              {/* exam details  */}
              <div className=" flex flex-row  space-y-2  space-x-2 items-center justify-between px-8 py-5 bg-richblack-700 border-[0.1rem] border-richblack-300 border-b-0 ">
                <div className=" w-[50%]">
                  <div className="  text-richblack-50 text-2xl font-semibold">
                    {exam?.category?.name} : {exam?.examName}
                  </div>

                  <div className=" : text-base  text-richblack-100">
                    Total Paper: {exam?.examPaper?.length}
                  </div>
                </div>

                <div className=" flex gap-4 items-center md:flex-row flex-col">
                  <div className="">
                    {exam?.status === EXAM_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-800 px-2 py-[2px] text-[12px] font-medium text-pink-200">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-800 px-2 py-[2px] text-[12px] font-medium   text-caribbeangreen-400">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-caribbeangreen-400 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </div>
                    )}
                  </div>

                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-exam/${exam._id}`);
                      dispatch(setStep(2));
                    }}
                    title="Edit"
                    className=" transition-all duration-200 hover:scale-110  text-richblack-700  bg-yellow-400 font-semibold p-2 rounded-lg "
                  >
                    Add Paper +
                  </button>

                  <div className=" flex gap-x-3 text-richblack-300">
                    <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-exam/${exam._id}`);
                      }}
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this exam?",
                          text2:
                            "All the data releted to this exam will deleted ",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleExamDelete(exam._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }}
                      title="Delete"
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* papers table  */}
              <div>
                {exam?.examPaper.length === 0 ? (
                  <div className="  text-xl font-semibold py-5 text-center text-richblack-100 border border-richblack-300">
                    {" "}
                    No paper found in this exam.
                  </div>
                ) : (
                  <Table className="rounded-xl border border-richblack-300  ">
                    <Thead>
                      <Tr className="grid grid-cols-6   border-b  border-richblack-300   justify-between bg-richblack-800 ">
                        <Th className="text-center text-sm font-medium uppercase text-richblack-100 border-x-[0.07rem] py-5 border-richblack-300 ">
                          Sr. No.
                        </Th>
                        <Th className=" text-center col-span-2 text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                          Paper Name
                        </Th>
                        <Th className="text-center text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                          Questions
                        </Th>
                        <Th className="text-center text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                          Duration
                        </Th>
                        <Th className="text-center text-sm font-medium uppercase text-richblack-100 py-5 border-r-[0.07rem] border-richblack-300 ">
                          Action
                        </Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {exam?.examPaper?.map((paper, index) => (
                        <Tr
                          key={paper._id}
                          className="grid  grid-cols-6 border-b border-r-[0.07rem] border-richblack-300   justify-between"
                        >
                          <Td className=" text-center text-sm font-medium text-richblack-100 border-x-[0.07rem] py-5 border-richblack-300 ">
                            {index + 1}
                          </Td>

                          <Td className=" text-center col-span-2  text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                            <div className=" flex items-center  gap-x-2 justify-center">
                              {paper?.status === "Published" ? (
                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-caribbeangreen-400 text-richblack-700">
                                  <FaCheck size={8} />
                                </div>
                              ) : (
                                <div className="flex  items-center justify-center  rounded-full  text-pink-200">
                                  <HiClock size={14} />
                                </div>
                              )}

                              <p>{paper?.paperName}</p>
                            </div>
                          </Td>
                          <Td className="  text-center text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                            {paper?.questions.length}
                          </Td>
                          <Td className=" text-center  text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                            {paper?.duration} min
                          </Td>

                          <Td className=" text-center text-sm font-medium text-richblack-100 py-5 ">
                            <div className=" justify-center flex gap-x-3 text-richblack-300">
                              <button
                                disabled={loading}
                                onClick={() => {
                                  navigate(
                                    `/dashboard/edit-paper/${paper._id}/${exam._id}`
                                  );
                                }}
                                title="Edit"
                                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                              >
                                <FiEdit2 size={20} />
                              </button>

                              <button
                                disabled={loading}
                                onClick={() => {
                                  setConfirmationModal({
                                    text1: "Do you want to delete this paper?",
                                    text2:
                                      "All the data releted to this paper will deleted ",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: !loading
                                      ? () =>
                                          handleDeletePaper(paper._id, exam._id)
                                      : () => {},
                                    btn2Handler: !loading
                                      ? () => setConfirmationModal(null)
                                      : () => {},
                                  });
                                }}
                                title="Delete"
                                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                              >
                                <RiDeleteBin6Line size={20} />
                              </button>
                            </div>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
