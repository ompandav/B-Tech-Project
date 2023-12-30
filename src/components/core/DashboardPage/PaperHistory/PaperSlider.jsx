import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "../../.."
// Import required modules
import {
  FreeMode,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import ReviewModal from "./ReviewModal";
import StudentModal from "./StudentModal";

// import { getAllpapers } from "../../services/operations/courseDetailsAPI"

function PaperSlider({ papers,name }) {

    const [studentModal,setStudentModal]=useState(null)
    const [reviewModal,setReviewModal]=useState(null)
    console.log(papers)
  return (
    <>
      {papers?.length ? (
        <Swiper
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
            600: {
              slidesPerView: 1,
            },
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={
            {
            //   delay:2500,
              disableOnInteraction:false
            }
          }
            modules={[FreeMode, Pagination, Autoplay]}
        //   modules={[FreeMode, Pagination]}
          // }}
          className="max-h-[30rem] w-[350px] md:w-full "
        >
          {papers?.map((paper, i) => (
            <SwiperSlide key={i}>
              <div className=" flex flex-col items-center justify-center border border-richblack-600 rounded-lg m-3 ">

                <p className=" text-lg  py-2 bg-richblack-800 w-full flex items-center justify-center rounded-t-lg">
                  {paper.paperName}
                </p>

                <div className="text-[12px] flex flex-col   p-4  gap-3 w-full items-center justify-center ">
                  <div className=" w-full flex flex-col  justify-center items-center  py-2  space-y-2 border border-richblack-600 rounded-lg ">
                    <p>Completed Students: {paper?.studentsCompleted?.length}</p>
                    <button 
                    onClick={()=>setStudentModal({
                              title: name + " : " +paper.paperName,
                              data:paper?.studentsCompleted,
                              btn1Text: "Close",
                              btn1Handler: () => setStudentModal(null),


                    })}

                    className="text-center  font-medium  p-2
                                border border-richblack-600
                                  hover:scale-95 transition-all duration-200 rounded"
                  >View Students</button>
                  </div>
                  <div className=" w-full  flex flex-col  justify-center items-center py-2 space-y-2 border border-richblack-700 rounded-lg">
                    <p className=" text-richblack-200">Reviews : {paper?.studentsCompleted?.length}</p>
                    <button
                    onClick={()=>setReviewModal({
                              title: name + " : " +paper.paperName,
                              data:paper?.reviews,
                              btn1Text: "Close",
                              btn1Handler: () => setReviewModal(null),


                    })}
                      className="text-center  font-medium  p-2
                              bg-yellow-400 text-black 
                                  hover:scale-95 transition-all duration-200 rounded"
                    >
                      See Reviews
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-50">No Paper Found</p>
      )}

      {reviewModal && (<ReviewModal modalData={reviewModal}/>)}
      {studentModal && (<StudentModal modalData={studentModal}/>)}
    </>
  );
}

export default PaperSlider;
