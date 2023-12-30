import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { EXAM_STATUS } from "../../../utils/constants";
import ConfirmationModal from "../../comman/ConfirmationModal";
import { useEffect } from "react";

import { fetchInstituteExamsStudent } from "../../../services/operations/examAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { FaCheck } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { setTime } from "../../../slices/viewPaperSlice";

export default function StudentHome() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token, institute } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [examsDetails, setExamsDetails] = useState([]);
  const fetchExams = async () => {
    const result = await fetchInstituteExamsStudent(institute._id, token);
    if (result) {
      setExamsDetails(result);
    }
  };
  useEffect(() => {
    fetchExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // console.log("examD",examsDetails)
  const setTimeOfExam = (duration) => {
    localStorage.setItem("time", JSON.stringify(duration));

    dispatch(setTime(duration));
  };

  return (
    <div>
      <div>
        {examsDetails?.length === 0 ? (
          <div className="grid flex-1 place-items-center">Exam not Found</div>
        ) : (
          examsDetails.exams?.map((exam) => (
            <div key={exam._id} className=" flex flex-col">
              {/* exam details  */}
              {exam?.examPaper?.length > 0 && (
                <div className=" flex flex-row  space-y-2  space-x-2 items-center justify-between px-8 py-5 bg-richblack-600 border-[0.1rem] border-richblack-300 ">
                  <div className=" w-[50%]">
                    <div className="  text-richblack-5 text-2xl font-semibold">
                      {exam?.category?.name} : {exam?.examName}
                    </div>

                    <div className=" : text-base  text-richblack-25">
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
                        <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-800 px-2 py-[2px] text-[12px] font-medium text-caribbeangreen-400">
                          <p className="flex h-3 w-3 items-center justify-center rounded-full  bg-caribbeangreen-400 text-richblack-700">
                            <FaCheck size={8} />
                          </p>
                          Published
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* papers table  */}
              {exam?.examPaper?.length > 0 && (
                <div className=" pb-16">
                  {exam?.examPaper.length === 0 ? (
                    <div className="  text-xl font-semibold py-5 text-center text-richblack-50 border border-richblack-300">
                      {" "}
                      No paper found in this exam.
                    </div>
                  ) : (
                    <Table className="rounded-xl border border-richblack-300  ">
                      <Thead>
                        <Tr className="grid grid-cols-6   border-b  border-b-richblack-300   justify-between bg-richblack-800 ">
                          <Th className="text-center text-sm font-medium uppercase text-richblack-50 border-x-[0.07rem] py-5 border-richblack-300 ">
                            Sr. No.
                          </Th>
                          <Th className=" text-center col-span-2 text-sm font-medium uppercase text-richblack-50 border-r-[0.07rem] py-5 border-richblack-300 ">
                            Paper Name
                          </Th>
                          <Th className="text-center text-sm font-medium uppercase text-richblack-50 border-r-[0.07rem] py-5 border-richblack-300 ">
                            Questions
                          </Th>
                          <Th className="text-center text-sm font-medium uppercase text-richblack-50 border-r-[0.07rem] py-5 border-richblack-300 ">
                            Duration
                          </Th>
                          <Th className="text-center text-sm font-medium uppercase text-richblack-50 py-5 border-r-[0.07rem]  border-richblack-300">
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
                            <Td className=" text-center text-sm font-medium text-richblack-50 border-x-[0.07rem] py-3 border-richblack-300 ">
                              {index + 1}
                            </Td>

                            <Td className=" text-center col-span-2  text-sm font-medium text-richblack-50 border-r-[0.07rem] py-3 border-richblack-300 ">
                              {paper?.paperName}
                            </Td>
                            <Td className="  text-center text-sm font-medium text-richblack-50 border-r-[0.07rem] py-3 border-richblack-300 ">
                              {paper?.questions.length}
                            </Td>
                            <Td className=" text-center  text-sm font-medium text-richblack-50 border-r-[0.07rem] py-3 border-richblack-300 ">
                              {paper?.duration} min
                            </Td>

                            <Td className=" text-center text-sm font-medium text-richblack-50 py-2 ">
                              <div className=" justify-center flex gap-x-3 text-richblack-300">
                                <button
                                  disabled={loading}
                                  onClick={() => {
                                    setTimeOfExam(paper?.duration);
                                    navigate(
                                      `/view-paper/${paper._id}/question/${paper?.questions[0]?._id}`
                                    );
                                  }}
                                  title="Edit"
                                  className=" transition-all duration-200 hover:scale-110  text-richblack-900   bg-[#9b2929] font-semibold p-[0.4rem] rounded-md "
                                >
                                  Attempt
                                </button>
                              </div>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
