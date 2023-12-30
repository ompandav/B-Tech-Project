import { useEffect, useState } from "react";

import ConfirmationModal from "../../comman/ConfirmationModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import {VscAdd} from "react-icons/vsc"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import {
  addStudent,
  deleteInstituteStudent,
  getInstituteStudents,
} from "../../../services/operations/studentAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import EditProfile from "./Settings/EditProfile";
import UpdatePassword from "./Settings/UpdatePassword";
import UpdateStudentModal from "./Settings/UpdateStudentModal";

function AddStudent() {
  const { institute, token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [formOpen,setFormOpen]=useState(false) 
  const [edit,setEdit]=useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null);

  // for the Eye button
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.firstName + " " + data.lastName);
    formData.append("email", data.email);
    formData.append("contact",data.contact)
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("instituteId", institute._id);

    setLoading(true);
    await addStudent(formData, token);
    setLoading(false);
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("email", "");
    setValue("contact","");
    setValue("password", "");
    setValue("confirmPassword", "");
    setLoading(false);
    setFetch(!fetch);
  };

  const getStudents = async () => {
    setLoading(true);
    const result = await getInstituteStudents(institute._id, token);
    if (result) {
      setStudents(result[0].students);
    }
    setLoading(false);
    setFormOpen(false)
  };
  useEffect(() => {
    getStudents();
  },[fetch,edit]);

  const handleDeleteStudent = async (instituteId, studentId) => {
    setLoading(true);
    await deleteInstituteStudent(
      { instituteId: instituteId, studentId: studentId },
      token
    );
    setLoading(false);
    setConfirmationModal(null);
    setFetch(!fetch);
  };

  return (
    <div className=" flex flex-col  items-center justify-center ">
   
      <p className=" text-richblack-100 text-4xl text-center font-bold   px-6 p-3 w-11/12 mt-4">Add Student</p>
  

      {/* Form this is main form of sign up page  */}
     {
       formOpen  && (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex p-10  m-5 border rounded-lg border-richblack-300 flex-col gap-y-4 "
      >
        {/* first and last name div  */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="firstName" className=" lable-style">
              {" "}
              First Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="firstName"
              placeholder="Enter First Name"
              {...register("firstName", { required: true })}
              className=" form-style w-full"
            />
            {errors.firstName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                First name is Required{" "}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="lastName" className=" lable-style">
              {" "}
              Last Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="lastName"
              placeholder="Enter Last Name"
              {...register("lastName", { required: true })}
              className=" form-style w-full"
            />
            {errors.lastName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Last name is Required{" "}
              </span>
            )}
          </div>
        </div>

        {/* email address and contact */}
        <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className=" lable-style">
            {" "}
            Email Address <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter Email Address"
            {...register("email", { required: true })}
            className=" form-style w-full"
          />
          {errors.email && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Email address is Required{" "}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
              <label htmlFor="contact" className="lable-style">
                Contact Number
              </label>

              <input
                type="tel"
                name="contact"
                id="contact"
                placeholder="Enter Contact Number"
                className="form-style "
                
                {...register("contact", {
                  required: {
                    value: true,
                    message: "Please enter your contact Number",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
              />
              {errors.contact && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contact.message}
                </span>
              )}
        </div>

        </div>
        

        {/* crete password and  conform password  */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex flex-col space-y-2">
            <label htmlFor="password" className=" lable-style">
              {" "}
              Password <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password", { required: true })}
              className=" form-style w-full"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[35px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.password && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Password is Required{" "}
              </span>
            )}
          </div>

          <div className=" relative flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className=" lable-style">
              {" "}
              Confirm Password <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
              className=" form-style w-full"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[35px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.confirmPassword && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Confirm pasword is Required{" "}
              </span>
            )}
          </div>
        </div>

        {/* submit button  */}
        <div className=" flex justify-between px-2 ">
          
        <button
        onClick={()=>setFormOpen(false)}
        
          disabled={loading}
          className="mt-6 rounded-[8px]  text-lg font-semibold py-[8px] px-[12px]  text-richblack-100 border border-richblack-300 hover:scale-95 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 rounded-[8px] bg-yellow-500 text-lg font-semibold py-[8px] px-[12px]  text-richblack-900 hover:scale-95 transition-all duration-200"
        >
          Add Student
        </button>
        </div>
      </form>

       )
     }
     
    <div className=" w-full">

      
      <div className=" flex  px-1 py-4 items-center justify-between  gap-12 ">
     
      <div className=" text-2xl text-richblack-200  font-semibold  text-center"> 
      {institute.name} Institute Students
      </div>
      {!formOpen && <button
      onClick={()=>setFormOpen(true)}
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 mt-6  bg-yellow-300 text-lg font-semibold py-[8px] px-[12px] hover:scale-95 transition-all duration-200  rounded-lg  text-richblack-900"
        >
          Add Student 
          <VscAdd size={16}/>
        </button>}

    </div>

        <Table className="rounded-xl border border-richblack-300 border-b-0  ">
          <Thead>
            <Tr className="grid grid-cols-7  border-b  border-richblack-300 justify-between bg-richblack-800 ">
              <Th className="text-center text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                Sr. No.
              </Th>
              <Th className=" text-center  col-span-2 text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                Name
              </Th>
              <Th className="text-center col-span-3 text-sm font-medium uppercase text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                Email
              </Th>
              <Th className="text-center text-sm font-medium uppercase text-richblack-100 py-5 border-richblack-300 ">
                Action
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {students?.length === 0 ? (
              <Tr className=" border-b-[0.07rem]  border-richblack-300  justify-between">
                <Td className="text-center text-lg font-medium text-richblack-100  py-5  ">
                  {" "}
                  No student Avialable in Institute{" "}
                </Td>
              </Tr>
            ) : (
              students?.map((student, index) => (
                <Tr
                  key={student._id}
                  className="grid  grid-cols-7 border-b-[0.07rem]  border-richblack-300  justify-between"
                >
                  <Td className=" text-center text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300  ">
                    {index + 1} 
                  </Td>

                  <Td className=" text-center col-span-2 text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                    {student?.name}
                  </Td>
                  <Td className="  text-center col-span-3 text-sm font-medium text-richblack-100 border-r-[0.07rem] py-5 border-richblack-300 ">
                    {student?.email}
                  </Td>

                  <Td className=" text-center text-sm font-medium text-richblack-100 py-5 ">
                    <div className=" justify-center flex gap-x-3 text-richblack-300">
                    <button
                      disabled={loading}
                      onClick={() => {
                             setEdit({
                              btn1Text: "Close",
                              btn1Handler: () => setEdit(null),
                              data:{id:student?._id,
                              name:student?.name,
                              email:student?.email,
                              contact:student?.contact,
                              role:"Admin"}
                              
                             })
                      }}
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Do you want to delete this Student?",
                            text2:
                              "All the data releted to this Student will deleted ",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () =>
                                  handleDeleteStudent(
                                    institute._id,
                                    student._id
                                  )
                              : () => {},
                            btn2Handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                          });
                        }}
                        title="Delete"
                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      {edit && <UpdateStudentModal modalData={edit}/>}
    </div>
  );
}

export default AddStudent;
