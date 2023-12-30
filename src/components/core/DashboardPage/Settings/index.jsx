import React from 'react'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import { useSelector } from 'react-redux'

export default function Settings() {
  const {user}=useSelector((state)=>state.profile)

  const data = {
    name:user?.name,
    email:user?.email,
    contact:user?.contact,
    id:user?._id
  }
  console.log(data)
  return (
   <div>
     <h1 className="mb-14  mt-6 text-4xl font-bold text-richblack-100 text-center">
        My Profile
    </h1>
    <EditProfile data={data}/>
    <UpdatePassword data={data}/>
   </div>
  )
}
