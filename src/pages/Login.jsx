import React from 'react'



import Template from '../components/core/Auth/Template'


export default function Login() {
  return (

    //send all requird inform ation to template 
    //this is common template for the sign up and login page 
    

    <Template
    title="Welcome Back"
    description1="Build skills for today, tomorrow, and beyond."
    description2="Education to future-proof your career."
 
    formType="login"
  />
    
  )
}
