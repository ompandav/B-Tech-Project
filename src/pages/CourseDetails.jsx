import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { buyCourse } from "../services/operations/StudentFeaturesAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/comman/ConfirmationModal";
import { getCourseDetails } from "../services/operations/courseAPI";
import RatingStars from "../components/comman/RatingStars";
import { formatDate } from "../services/formatDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import Footer from "../components/comman/Footer";
import { addToCart } from "../slices/cartSlice";
import { ADMIN } from "../utils/constants";
import { toast } from "react-hot-toast";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";



export default function CourseDetails() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCoursData] = useState(null);
  const [avgRatingCount, setAvgRatingCount] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // onchanging course fetch course details
  useEffect(() => {
    const getCourse = async () => {
      try {
        const result = await getCourseDetails(courseId);
        console.log("result ", result);
        setCoursData(result);
        // console.log("printing course",courseData)
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, [courseId]);

  console.log("printing course data", courseData);

  //    calculatee avg rating

  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.courseDetails?.ratingAndReview
    );
    setAvgRatingCount(count);
  }, [courseData]);

  //  calculate the total number of lecture
  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent.forEach((section) => {
      lectures += section.subSection.length || 0;
    });
    setTotalLectures(lectures);
  }, [courseData]);

  // // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    );
  };

  if (loading || !courseData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleBuyCourse = () => {
    // only loged in user can buy the course
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    //unlogined user

    setConfirmationModal({
      text1: "You are not Logged In",
      text2: "Plese Login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToCart = () => {
    // if instructor
    if (user && user?.accountType === ADMIN.INSTRUCTOR) {
      toast.error("You Are Instructor. You can't Buy Course");
      return;
    }
    // if student
    if (token) {
      dispatch(addToCart(courseData?.courseDetails));
      return;
    }
    // not logged in student
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };
  // console.log("printing course data",courseData)

  // set all data of course
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbNail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReview,
    instructor,
    studentEnrolled,
    createdAt,
  } = courseData.data?.courseDetails;

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* hero section  */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbNail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>

            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-100`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-100 sm:text-[42px]">
                  {courseName}
                </p>
              </div>

              <p className={`text-richblack-200`}>{courseDescription}</p>

              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-100">{avgRatingCount}</span>
                <RatingStars Review_Count={avgRatingCount} Star_Size={24} />
                <span> {`${ratingAndReview.length} reviews`}</span>
                <span> {`${studentEnrolled.length} students`}</span>
              </div>

              <div>
                <p>
                  Created By :{" "}
                  {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>

              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle />
                  Created At : {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-100">
                Rs. {price}
              </p>
              <button
            className="yellowButton"
            onClick={
              user && studentEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && studentEnrolled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>
          {/* add to cart button */}
          {(!user || !studentEnrolled.includes(user?._id)) && (
            <button onClick={handleAddToCart} className="blackButton md:bg-richblue-25">
              {" "}
              Add to Cart
            </button>
          )}
            </div>

          </div>

          {/* course card  */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
           
           { token? ( user.accountType===ADMIN.STUDENT &&(
            <CourseDetailsCard
              course={courseData?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />)):( <CourseDetailsCard
              course={courseData?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}/>)
           }
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-100 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* what will you learn  */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* course content section  */}
          <div className="max-w-[830px] ">
            {/* heading part  */}
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>

              <div className="flex gap-2">
                <span>
                  {courseContent.length} {`section(s)`}
                </span>
                <span>
                  {totalLectures} {`lecture(s)`}
                </span>
                <span>{courseData?.data?.totalDuration} total length</span>
              </div>

              <div>
                <button
                  className="text-yellow-200"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>
              </div>
            </div>

            {/* course details Accordoion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>


            {/* auther Details  */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div>
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Auther"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-200">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      
    </>
  );
}

  