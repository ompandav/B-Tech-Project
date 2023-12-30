import React from 'react'

import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import IconBtn from '../../../comman/IconBtn'
import { VscChromeClose } from 'react-icons/vsc'
export default function UpdateStudentModal({modalData}) {
    console.log(modalData)
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm" >
    <div className=" relative w-11/12 rounded-lg border border-richblack-400 bg-richblack-900 p-6 flex flex-col items-center justify-center  gap-y-4 my-4">
    <div
      onClick={modalData?.btn1Handler}
       className=" absolute top-0 right-0 rounded-tr-lg p-2 text-richblack-100  hover:bg-pink-400 cursor-pointer ">
       <VscChromeClose  size={30}/>
      </div>
      
      <div className=" flex flex-col items-center justify-center  ">
      <div className=' text-2xl text-richblack-50 font-semibold'> Update Student Profile </div> 
        <div>
          <EditProfile data={modalData?.data}/>
          <UpdatePassword data={modalData?.data}/>
        </div>

        <IconBtn
          onclick={modalData?.btn1Handler}
          text={modalData.btn1Text}
        />
      </div>

    </div>
  </div>
  )
}
