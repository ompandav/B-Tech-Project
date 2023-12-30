import React, { useState } from "react";

import IconBtn from "../../../comman/IconBtn";
import {  formattedDate } from "../../../../utils/dateFormater";
import { useSelector } from "react-redux";
import {VscChromeClose} from "react-icons/vsc"
 
export default function ReviewModal({ modalData }) {
     
   
    const{user}= useSelector((state)=>state.profile)
    const [more,setMore]=useState(null)
    const truncateWords=15
   
  return (
    <div className="  fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm" >
      <div className=" relative w-11/12 rounded-lg border border-richblack-400 bg-richblack-900 p-6 flex flex-col items-center justify-center  gap-y-4 my-4">
      <div
      onClick={modalData?.btn1Handler}
       className=" absolute top-0 right-0 rounded-tr-lg p-2 text-richblack-100  hover:bg-pink-400 cursor-pointer ">
       <VscChromeClose  size={30}/>
      </div>

         {/* title  */}
        <p className=" mt-2 text-xl font-semibold text-richblack-100">
          {modalData?.title}
        </p>

        <div>
            {modalData?.data?.length<=0 ? (<div className=" text-base font-semibold ">No review for this paper yet </div>):(
                <div className=" flex flex-wrap justify-center items-center md:p-10 p-1 gap-x-10 md:gap-y-10  gap-y-5" >
                {
                    modalData?.data?.map((review,index)=>(
                        <div key={index}>
                        <div className=" flex flex-col  gap-y-2 border  border-richblack-600 p-2 rounded-md bg-richblack-800">
                        <p className=" text-lg font-medium">{review?.user?.name}</p>
                        <p>{review?.user?.email}</p>
                        <div className="  bg-richblack-900 p-2   rounded-md md:w-[300px]  ">
                        {

                        review?.review.split(" ").length > truncateWords
                      ? 
                      <div>
                          {`${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`}
                          <span className=" text-richblue-600 cursor-pointer " onClick={()=>setMore(review?.review)}> more</span>
                         </div>
                      : `${review?.review}`}</div>

                        </div>
                
                       

                        </div>
                    ))
                }
                </div>
            )}
        </div>

         
        <div className="  ">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
        </div>

      </div>
      {
        more && (<div className="md:w-[400px] absolute bg-richblack-700 p-4 m-7 rounded-lg">{more}..<span className=" text-richblue-600 cursor-pointer " onClick={()=>setMore(null)}>less</span></div>)
      }
    </div>
  );
}
