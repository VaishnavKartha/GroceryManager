import React, { useState } from 'react'
import {Eye, EyeOff} from 'lucide-react'
import { validateData } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [formData,setFormData]=useState({email:"",password:""});
  const [showPassword,setShowPassword]=useState(false);
  const {Validate}=validateData()
  const {login}=useAuth();
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);

  const handleChange=(e)=>{
    const fieldName=e.target.name;
    const value=e.target.value;
    setFormData({...formData,[fieldName]:value});

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const isValid=Validate(formData)
    if(isValid){
      try{
        setLoading(true);
        await login(formData);
      }
      finally{
        setLoading(false);
      }
      
    }
  }



  return (
    <div className='w-screen flex justify-center p-2 bg-primary h-screen '>
      <form onSubmit={handleSubmit} className=' mt-8 md:mt-24 lg:mt-32 h-fit shadow-md pb-12 pt-2 px-4 w-full md:w-[60vw] md:px-4 lg:w-[40vw] lg:px-8 bg-white/10 backdrop-blur-lg '>

        <h2 className='text-center text-4xl text-text-main'>Login</h2>


        <div className='flex flex-col mb-4 text-background'>
          <label className='text-background'>Email</label>
          <input
          className='input-field'
          type='text'
          value={formData.email}
          name='email'
          onChange={handleChange}/>
        </div>

        <div className='flex flex-col text-background'>
          <label className='text-background'>Password</label>
          <div className='relative w-full'>
            <input
            className='w-full input-field'
            type={showPassword?"text":"password"}
            value={formData.password}
            name='password'
            onChange={handleChange}/>

            <span className='absolute right-0' onClick={()=>setShowPassword(!showPassword)}>{!showPassword?<EyeOff/>:<Eye/>}</span>
          </div>
        </div>

        <p className='text-text-sec'>Dont't Have an Account? <span onClick={()=>navigate("/signup")} className='text-text-main cursor-pointer hover:underline'>Signup</span></p>
        <button disabled={loading} className='mx-auto w-full btn mt-4'>Login</button>

        

      </form>
    </div>
  )
}

export default Login
