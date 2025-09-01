import React, { useState } from "react";
import toast from "react-hot-toast";
export const validateData=()=>{
    const [errors,setErrors]=useState({});
    const Validate=(formData)=>{
        const {username,email,password}=formData;
        //console.log(formData)
    

    let error={};
    if(username!==undefined && !username.trim()){
        error.username="Username Required"
        toast.error("username")
        return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email!==undefined && !emailRegex.test(email)){
        error.email="Use a valid email"
        toast.error(error.email)
        return false
    }

    if(password!==undefined && password.length<6){
        error.password="Password must be atleast 6 character long"
        toast.error(error.password)
        return false
    }

    setErrors(error)
    return true

    }

    return {Validate}
    

}