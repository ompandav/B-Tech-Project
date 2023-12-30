import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"

import { useNavigate } from "react-router-dom"

import IconBtn from "../../comman/IconBtn"
import ExamsTable from "./InstituteExams/ExamsTable"

export default function MyExams() {
  const navigate = useNavigate()
 
  return (
    <div>
      <div className="mb-14 mt-6 flex md:flex-row items-center justify-between flex-col gap-y-5 ">
        <h1 className="text-4xl font-bold text-richblack-100  text-center w-10/12">My Exams</h1>

        <IconBtn
          text="Add Exam"
          onclick={() => navigate("/dashboard/add-exam")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {<ExamsTable  />}
    </div>
  )
}