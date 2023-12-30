import React from "react";
import Footer from "../components/comman/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "../services/apiconnector";
import { courseEndpoints } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { useSelector } from "react-redux";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";
import Error from "./Error";

export default function Catalog() {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);

  //fetch all category  on changing of catalog name

  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector(
          "GET",
          courseEndpoints.COURSE_CATEGORIES_API
        );
        const category_id = res?.data?.cataegory?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        setCategoryId(category_id);
      } catch (error) {
        console.log("Could not ffetch Categories", error);
      }
    })();
  }, [catalogName]);

  // fetch categor pdge details on change of category_Id

  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const result = await getCatalogPageData(categoryId);
          if (result) setCatalogPageData(result);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    // return <Error />
    return <Error />;
  }

  // console.log("cpdata",catalogPageData)

  return (
   <>

<div className="  flex flex-col pt-10  ">
       {/* Hero section  */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex  w-11/12 min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-200">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      <div className=" mx-auto w-11/12" >
        {/* section1 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab   py-12 lg:max-w-maxContent">
          <div className="section_heading mb-1">Courses to get you started</div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p
              className={`px-4 py-2 ${
                active === 1
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer`}
              onClick={() => setActive(1)}
            >
              Most Populer
            </p>
            <p
              className={`px-4 py-2 ${
                active === 2
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <div className=" mt-10">
            <CourseSlider
              Courses={catalogPageData?.data?.selectedCategory?.course}
            />
          </div>
        </div>


        {/* section2 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab  py-12 lg:max-w-maxContent">
        <div className="section_heading">
            Top Courses 
          </div>

          <div className=" py-8">
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategory?.course}
            />
          </div>
        </div>

        {/* section 3 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab  py-12 lg:max-w-maxContent">
        <div className="section_heading mb-10">Frequently Bought</div>

        <div className="py-8 border-richblack-700 border-[0.12rem] rounded-xl p-10 ">
            <div className=" grid grid-cols-1 gap-6 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)

                .map((course, index) => (
                  <Course_Card
                    course={course}
                    key={index}
                    Height={"lg:h-[300px] h-[180px]"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
     
    </div>
    <Footer />
   </>
  );
}
