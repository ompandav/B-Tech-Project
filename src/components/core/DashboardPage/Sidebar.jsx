import React, { useState } from "react";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useLocation, useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../comman/ConfirmationModal";
import { ADMIN } from "../../../utils/constants";


export default function Sidebar() {

  const { loading: authLoading,institute } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  // console.log(institute);

  let accountType;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading || profileLoading) {
    return (
      <div className="grid h-[100vh] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800  ">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div>
    
      <div className="flex  h-[100vh] min-w-[220px] flex-col border-r-[1px] border-r-richblack-300 bg-richblack-700 py-6">
       <div className=" text-2xl font-bold text-richblack-5 pb-6   text-center">
         {institute?.name}
       </div>

       <div className="mx-auto mb-6 h-[1px]  w-full bg-richblack-200" />
      
        <div className=" flex flex-col ">

          {sidebarLinks.map((link) => {
            // checking to which dashbord will be render student of instructor
            user.email !== ADMIN.EMAIL ? accountType="Student": accountType="Admin"
            
            if (link.type && accountType !== link.type) return null;

            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        {/* line */}
        <div className="mx-auto mt-6 mb-6 h-[0.1rem] w-full bg-richblack-200" />

        <div className=" flex flex-col">
          {/* setting */}
          <SidebarLink
            link={{ name: "Setting", path: "dashboard/settings" }}
            iconName={"VscSettingsGear"}
          /> 

          {/* logout */}
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "You will be logged out of your Acount",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-100"
          >
            <div className=" flex gap-x-2 items-center">
              <VscSignOut className="text-lg" />
              <span> Logout</span>
            </div>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
