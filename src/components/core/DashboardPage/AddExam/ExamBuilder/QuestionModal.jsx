

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createQuestion,
  updateQuestion,
} from "../../../../../services/operations/examAPI"
import { setExam } from "../../../../../slices/examSlice"
import IconBtn from "../../../../comman/IconBtn"
import Upload from "../Upload"
import RequirementField from "./Options"

export default function QuestionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
  forPaperEdit=false,
  populatPaperDetails,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { exam } = useSelector((state) => state.exam)

  useEffect(() => {
    if (view || edit) {
      // console.log("modalData", modalData)
      setValue("quest", modalData.quest)
      setValue("options", modalData.options)
      setValue("correct", modalData.correct)
    }
  }, [])
   
  // console.log("value",modalData.options);
  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.quest !== modalData.quest ||
      currentValues.options.toString() !== modalData.options.toString() ||
      currentValues.correct !== modalData.correct
    ) {
      return true
    }
    return false
  }

  // handle the editing of subpaper
  const handleEditQuestion = async () => {
    

    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    const formData = new FormData()
    // console.log("Values After Editing form values:", currentValues)
    formData.append("paperId", modalData.paperId)
    formData.append("questionId", modalData._id)
    if(!formData)
    {

      formData.append("examId",exam._id)
    }

    if (currentValues.quest !== modalData.quest) {
      formData.append("quest", currentValues.quest)
    }
    if (currentValues.options !== modalData.options) {
      formData.append("options", JSON.stringify(currentValues.options))
    }
    if (currentValues.correct !== modalData.correct) {
      formData.append("correct", currentValues.correct)
    }
   

    setLoading(true)
    const result = await updateQuestion(formData, token)
    if (result) {
      // console.log("result", result)
      // update the structure of exam
      if(!forPaperEdit)
      {
        const updatedExamPaper = exam.examPaper.map((paper) =>
        paper._id === modalData.paperId ? result : paper
      )
      const updatedexam = { ...exam, examPaper: updatedExamPaper }
      dispatch(setExam(updatedexam))
      }
      else{
        populatPaperDetails()
      }
     
    
    }
    setModalData(null)
    setLoading(false)
  }


  const onSubmit = async (data) => {
    // console.log(data)
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditQuestion()
      }
      return
    }
    // const { quest , duration, options, paperId } = req.body;
    // const videoFile = req.files.videoFile;

    const formData = new FormData()
    formData.append("paperId", modalData)
    formData.append("quest", data.quest)

    formData.append("options", JSON.stringify(data.options))
    formData.append("correct", data.correct)

    setLoading(true)

    const result = await createQuestion(formData, token)
    if (result) {
      // update the structure of exam
      if(!forPaperEdit)
      {
        const updatedExamPaper = exam.examPaper.map((paper) =>
        paper._id === modalData ? result : paper
      )
      const updatedExam = { ...exam, examPaper: updatedExamPaper }
      dispatch(setExam(updatedExam))
    }
    else{
      populatPaperDetails()
    }

      }
      
    setModalData(null)
    setLoading(false)
  }




  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}

        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Question
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Paper question */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="quest">
              Question {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="quest"
              placeholder="Enter Question"
              {...register("quest", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full bg-richblack-900"
            />
            {errors.quest && (
              <span className="ml-2 text-xs tracking-wide text-pink-200 ">
                Question is required
              </span>
            )}
          </div>

          <RequirementField
            name="options"
            label="Options"
            placeholder="Enter the options  "
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            edit={edit}
            view={view}
            modalData={modalData}

          />

          {/* Lecture options */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="options">
              correct options{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="options"
              placeholder="Enter correct option"
              {...register("correct", { required: true })}
              className="form-style  w-full bg-richblack-900"
            />
            {errors.correct && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                 Correct option is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
              type={"submit"}
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
