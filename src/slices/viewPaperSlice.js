
import { createSlice } from "@reduxjs/toolkit"
import { act } from "react-dom/test-utils";
import toast from "react-hot-toast";

const initialState = {

  noOfQuestion:localStorage.getItem("noOfQue") ? JSON.parse(localStorage.getItem("noOfQue")) :0,
  noOfCorrectAns:localStorage.getItem("noOfCorrectAns")?JSON.parse(localStorage.getItem("noOfCorrectAns")):0,
  noOfAnswered:localStorage.getItem("noOfAnswered")?JSON.parse(localStorage.getItem("noOfAnswered")):0,
  timeDuration:localStorage.getItem("time")?JSON.parse(localStorage.getItem("time")):"0",
  requiredTime:localStorage.getItem("reqTime")?JSON.parse(localStorage.getItem("reqTime")):0,
  result:localStorage.getItem("result")?JSON.parse(localStorage.getItem("result")):"",
  

  paperEntireData:null,
  totalQuestions:0,
  answered:[],
  correctAnswers:[],

}

const viewPaperSlice = createSlice({
  name: "viewPaper",
  initialState,
  reducers: {
   
    setEntirePaperData: (state, action) => {
      state.paperEntireData = action.payload
    },
    setTotalQuestions:(state,action)=>{
      state.totalQuestions=action.payload

    },

    addCorretAnswer:(state,action)=>{ 

      const questionId = action.payload
      const index =state.correctAnswers.findIndex((que)=>que===questionId)
   
    if(index>=0)
    {
        return;
    }

    
    state.correctAnswers?.push(questionId);
       
    },
    removeCorrectAnswer:(state,action)=>{

      const questionId = action.payload
      const index =state.correctAnswers.findIndex((que)=>que===questionId)
      if(index>=0)
         state.correctAnswers.splice(index,1)
      
      
    },

    addAnswred:(state,action)=>{
   
     

      const question = action.payload
      const index =state.answered.findIndex((que)=>que._id===question._id)
     
      if(index>=0)
      {
        state.answered[index].option=question.option
          return
      }
      
      state.answered?.push(question);
    },

    // removeAnswered:(state,action)=>{
    //   state.answered--;
    //   toast.error("Answer Removed")

    // },


    setNoOfQuestion:(state,action)=>{
      state.noOfQuestion=action.payload

    },
    setNoOfCorrectAns:(state,action)=>{
     state.noOfCorrectAns=action.payload;
    },
    setNoOfAnswered:(state,action)=>{
      state.noOfAnswered=action.payload

    },
    setTime:(state,action)=>
    {
      state.timeDuration=action.payload
    },
    setRquiredTime:(state,action)=>
    {
      state.requiredTime=action.payload
    },
    setResult:(state,action)=>
    {
      state.result=action.payload
    },


    resetPaper:(state,action)=>{
      state.paperEntireData={}
      state.answered=[]
      state.correctAnswers=[]
      state.totalQuestions=0
      state.timeDuration="0"
    },

    resetProgressData:(state,action)=>{

      // state.noOfQuestion=0,
      // state.noOfCorrectAns=0,
      // state.noOfAnswered=0,
      state.timeDuration="0"
      // state.requiredTime=0,
      state.result=""


    }


    
  },
})

export const {
 setEntirePaperData,
 setTotalQuestions,
 addAnswred,
//  removeAnswered,
 addCorretAnswer,
 removeCorrectAnswer,
 setNoOfQuestion,
 setNoOfAnswered,
 setNoOfCorrectAns,
 resetPaper,
 setTime,
 setRquiredTime,
 setResult,
 resetProgressData,

} = viewPaperSlice.actions

export default viewPaperSlice.reducer

