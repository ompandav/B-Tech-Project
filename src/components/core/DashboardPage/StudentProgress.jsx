import React from 'react'



import { useEffect, useState } from "react";

// import ConfirmationModal from "../../comman/ConfirmationModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import {VscAdd} from "react-icons/vsc"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useSelector } from "react-redux";
import { getInstituteStudents } from '../../../services/operations/studentAPI';
import { useNavigate } from 'react-router-dom';


export default function StudentProgress() {

  const {user}= useSelector((state)=>state.profile);
  const { institute, token } = useSelector((state) => state.auth);
  const [students, setStudents] = useState(null);
  const [loading,setLoading] = useState(false)
 const navigate = useNavigate()
  const getStudents = async () => {
    setLoading(true);
    const result = await getInstituteStudents(institute._id, token);
    if (result) {
      setStudents(result[0].students);
    }
    setLoading(false);
 
  };
  useEffect(() => {
    getStudents();
  },[]);
  


  return (
    <div>
    <div className=" text-4xl text-richblack-100  py-7 font-bold  text-center"> 
      {institute.name} Institute Students Progress
      </div>
       <Table className="rounded-xl border border-richblack-300 border-b-0 mt-6 ">
          <Thead>
            <Tr className="grid grid-cols-7  border-b  border-richblack-300 justify-between bg-richblack-800 ">
              <Th className="text-center text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300">
                Sr. No.
              </Th>
              <Th className=" text-center  col-span-2 text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300">
                Name
              </Th>
              <Th className="text-center col-span-3 text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300">
                Email
              </Th>
              <Th className="text-center text-sm font-medium uppercase text-richblack-100 py-5 ">
                Action
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {students?.length === 0 ? (
              <Tr className=" border-b-[0.07rem]  border-richblack-300 justify-between">
                <Td className="text-center text-lg font-medium text-richblack-100  py-5  ">
                  {" "}
                  No student Avialable in Institute{" "}
                </Td>
              </Tr>
            ) : (
              students?.map((student, index) => (
                <Tr
                  key={student._id}
                  className="grid  grid-cols-7 border-b-[0.07rem]  border-richblack-300 justify-between"
                >
                  <Td className=" text-center text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                    {index + 1} 
                  </Td>

                  <Td className=" text-center col-span-2 text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300">
                    {student?.name}
                  </Td>
                  <Td className="  text-center col-span-3 text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300">
                    {student?.email}
                  </Td>

                  <Td className=" text-center text-sm font-medium text-richblack-100 py-2 ">
                    <div className=" justify-center flex gap-x-3 text-richblack-800 font-semibold">
                      <button
                        disabled={loading}
                        onClick={() => {navigate(`/dashboard/see-progress/${student?._id}`)}}
                        title="Progress"
                        className="p-2 m-1  rounded-md transition-all duration-200 hover:scale-110  bg-yellow-300"
                      >
                        View Progress
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
    </div>
   
  )

}
