import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/logo-no-background.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { ADMIN } from "../../utils/constants";

import MobileMenu from "./MobileMenu";
import IconBtn from "./IconBtn";

export default function Navbar() {
  // testing data
  const [subLinks, setSublinks] = useState([]);
  // to check the current element clicked is color is yellow
  const location = useLocation();
  const { trackCourseUpdate } = useSelector((state) => state.exam);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // fetch the redux central date by using the react hook useSelector
  const { token } = useSelector((state) => state.auth); // destructor thr token fro the auth sclice that stor in the sclice folder of central data store
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

 

  return (
    <div className=" w-full  z-50 md:hidden pb-14">
    { token && 
      <div className=" w-full z-50 fixed flex bg-richblack-50  max-w-maxContent  items-center justify-between flex-row-reverse md:flex-row px-6 py-3   ">
    
    <img
      src={logo}
      width={160}
      height={42}
      loading="lazy"
      alt="logo"
    
    />
  

  <MobileMenu />

</div>

    }
    
     
    </div>
  );
}
