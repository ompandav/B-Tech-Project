import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddExam/RenderSteps';
import { setExam, setEditExam } from '../../../../slices/examSlice';
import { useEffect } from 'react';

import {fetchFullexam, getFullDetailsOfExam} from '../../../../services/operations/examAPI'

export default function EditExam() {

    const dispatch = useDispatch();
    const {examId}=useParams();
    const {exam} =useSelector((state) => state.exam);
    const {token} = useSelector((state)=>state.auth)

    const [loading, setLoading] = useState(false);

    // on frist render fetch the full exam details and set in exam slice 
    useEffect(()=>{
        const populatEexamDetails = async ()=>{
            setLoading(true)
            // console.log("examId",examId)
            // const result = await fetchFullexam(examId,token);
            const result = await getFullDetailsOfExam(examId,token)
            if(result?.examDetails)
            {
                 // this is for to set the edit flag as true for render as edit step in rendersteps components 
                dispatch(setEditExam(true))
                dispatch(setExam(result?.examDetails));
            }
            setLoading(false);
        }
        
        populatEexamDetails();
    },[])


    if(loading)
    {
        return (
            <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
        )
    }



  return (
    <div>
            <h1 className="mb-14 text-4xl font-bold text-richblack-5">
           Edit exam </h1>
       {
        exam? (<RenderSteps/>):(
            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">

        exam Not Foud</p>)
       }

    </div>
  )
}
