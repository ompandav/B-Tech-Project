import React from 'react'
import { VscHistory,VscSettingsGear,VscHome } from 'react-icons/vsc';
import {TfiPencilAlt} from 'react-icons/tfi'
import {GiNotebook,GiProgression} from 'react-icons/gi'
import {MdNoteAdd,MdGroupAdd} from 'react-icons/md'
import {BsGraphUpArrow} from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation , matchPath } from 'react-router-dom';
import { resetExamState, } from '../../../slices/examSlice';

export default function SidebarLink({link,iconName}) {

    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute =(route)=>{
        return matchPath({path:route},location.pathname)

    }
 


  return (
  
 <NavLink
    to={link.path}
    onClick={()=>dispatch(resetExamState())}
    className={ ` 
    relative px-8 py-2 text-sm font-medium 
    ${matchRoute(link.path)
    ? "bg-yellow-700 text-yellow-50"
    :"bg-opacity-0 text-richblack-100"}
     transition-all duration-200`}
    >

    {/* side yellow bar  */}

    <span className={` absolute left-0  top-0 h-full w-[0.15rem] bg-yellow-300
    ${ matchRoute(link.path)? " opacity-100":" opacity-0"}`}></span>
     
     <div className=' flex items-center gap-x-2'>
    
     {iconName === "VscHome" && (<VscHome className=' text-lg' />)}
     {iconName === "GiNotebook" && (<GiNotebook className=' text-lg' />)}
     {iconName === "GiProgression" && (<GiProgression className=' text-lg' />)}
     {iconName === "TfiPencilAlt" && (<TfiPencilAlt className=' text-lg' />)}
     {iconName === "MdNoteAdd" && (<MdNoteAdd className=' text-lg' />)}
     {iconName === "MdGroupAdd" && (<MdGroupAdd className=' text-lg' />)}
     {iconName === "BsGraphUpArrow" && (<BsGraphUpArrow className=' text-lg' />)}
     {iconName === "VscHistory" &&(<VscHistory className=' text-lg' />)}
     {iconName === "VscSettingsGear" && (<VscSettingsGear className=' text-lg' />)}

     
     
     

     <span> {link.name}</span>

     </div>

    </NavLink>

   
  )
}


