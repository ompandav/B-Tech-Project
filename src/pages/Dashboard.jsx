import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/DashboardPage/Sidebar'
export default function Dashboard() {


  const {loading:authLoading} = useSelector ((state)=>state.auth)
  const {loading:profileLoading} = useSelector ((state)=>state.profile)

  if(authLoading || profileLoading)
  {
    return (
      <div className=' spinner'>
        loading...
      </div>
    )
  }
 
  return (

    <div className="relative flex h-[100vh]  ">

<div className='hidden md:block'>

    <Sidebar/>
</div>

    <div className="h-[100vh] flex-1 overflow-auto">
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <Outlet/>
    </div>
    </div>

    </div>

   
    
  )




}
