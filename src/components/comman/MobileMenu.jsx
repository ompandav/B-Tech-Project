import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai"
import {VscMenu,VscChromeClose} from "react-icons/vsc"
import useOnClickOutside from "../../hooks/useOnClickOutside"
import { logout } from "../../services/operations/authAPI"
import Navbar from "./Navbar"
import MobileNav from "../core/Navbar/MobileNav"
import Sidebar from "../core/DashboardPage/Sidebar"

export default function MobileMenu() {
  
  
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

 

  return (
    <div>

    <button className="relative text-richblack-100 " onClick={() => setOpen(!open)}>
    <div>
    {
      open? (<VscChromeClose fontSize={30} fill="#AFB2BF"/>):(<VscMenu fontSize={30} fill="#AFB2BF" /> )
    }
  

    </div>

    </button>
      {open && (

         
              <div   onClick={(e) => e.stopPropagation()}
        className={`fixed z-50 h-screen bg-richblack-800 transition-all duration-500 overflow-y-hidden top-[3.7rem] ${
          open ? 'left-0' : '-left-64'  // Adjust the value accordingly
        }`}
        ref={ref}
               >
           
               <Sidebar/>

              </div>
    )
      }
    </div>
  )
}


 