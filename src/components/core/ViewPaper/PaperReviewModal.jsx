import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import IconBtn from "../../comman/IconBtn";
import { createReview } from "../../../services/operations/examAPI";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";

export default function PaperReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  // const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {paperId} =useParams()
  //set rating and review as empty at first render

  useEffect(() => {
    setValue("review", "");
  }, []);


  const onSubmit = async (data) => {
    await createReview(
      {
        review: data.review,
        paperId:paperId,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

      <div className="my-10 w-11/12 max-w-[550px] rounded-lg border border-richblack-400 bg-richblack-900 ">

        {/* header of modal  */}
        
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-800 p-5 ">
          <p className="text-xl font-semibold text-richblack-100">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-100" />
          </button>
        </div>

        {/* modal body */}

        <div className="py-4 px-5">
          <div className="flex items-center justify-center gap-x-4">
            <div>
              <p className="font-semibold text-richblack-100">
                {user?.name} 
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}
          className="mt-3 flex flex-col items-center">
           
            <div className="flex w-11/12 flex-col space-y-2">
              <label className="text-sm text-richblack-100" htmlFor="review">
                {" "}
                Add your Experience or any suggestion<sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="review"
                placeholder="Add your review"
                {...register("review", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.review && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {" "}
                  Please Add Your Review{" "}
                </span>
              )}
            </div>


              {/* buttons */}
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <IconBtn text={"Save"} />
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
