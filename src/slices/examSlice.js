import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    step :1,
    exam:null,
    editExam:false,
    trackCourseUpdation:false
}

const examSclice = createSlice({
    name:"exam",
    initialState,
    reducers:{
        setStep:(state, action)=>{
            state.step=action.payload
        },
        setExam:(state, action)=>{
            state.exam=action.payload
        },
        setEditExam:(state, action)=>{
            state.editExam=action.payload
        },
        setPaymentLoading:(state, action)=>{
            state.paymentLoading=action.payload
        },
        resetExamState:(state, action)=>{
            state.step=1
            state.exam=null
            state.editExam=false
        },
        setTrackCourseUpdate:(state,action)=>
        {
             state.trackCourseUpdation=action.payload
        }

    }

})

export const {
    setStep,
    setExam,
    setEditExam,
    resetExamState
} = examSclice.actions

export default examSclice.reducer