import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstituteExamsHistory } from '../../../services/operations/examAPI';
import PaperSlider from './PaperHistory/PaperSlider';

export default function PaperHistory() {

    const{token,institute}=useSelector((state)=>state.auth);
    const[loading,setLoading]= useState(false)
    const [exams,setExams]= useState(null)

    useEffect(()=>{
        const fetchExams = async ()=>
        {
            setLoading(true)
            const result = await fetchInstituteExamsHistory(institute,token);
            if(result)
            {
                setExams(result?.exams)

            }
            setLoading(false)
        }
        fetchExams()

    },[])

// console.log("exams",exams)




  return (
    <div className=' text-richblack-100'>
    <div className=' text-4xl font-bold py-5 text-center mb-6'>
        All Exams History
    </div>

    {
        !exams? (<div>No Exam available In institute </div>)
        :(
            <div className=' flex flex-wrap items-center space-y-5 justify-around '>
                {exams?.map((exam,index)=>(
                    <div key={index} className='flex   gap-x-10 flex-col md:w-[470px] border border-richblack-600 items-center justify-center rounded-lg'>
                         {/* title  */}
                        <div className=' flex gap-x-2 bg-richblack-800 w-full justify-center rounded-t-lg  text-xl font-semibold  py-5 '> 
                        <p>{exam?.category?.name} : </p>
                        <p> {exam?.examName}</p>
                        </div>
                        <div className=' flex w-full items-center justify-center my-5  '>
                            {!exam?.examPaper?(<div>No paper in exam</div>)
                            :(
                               <PaperSlider papers={exam?.examPaper} name={exam?.category?.name +" : "+exam?.examName}/>

                            )}
                        </div>

                    </div>
                ))
                    
                }
            </div>
        )
    }

    </div>
  )
}
