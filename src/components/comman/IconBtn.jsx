import React from "react";

export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button disabled={disabled} 
    onClick={onclick} 
    className={`flex items-center transition-all duration-200 hover:scale-110  ${
        outline ? "border border-richblack-100 bg-transparent" : "bg-yellow-300"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
      type={type}>
      {children ? (
        <>
          <span className={`${outline && "text-yellow-300"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
