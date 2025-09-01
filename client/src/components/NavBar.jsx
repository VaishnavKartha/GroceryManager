import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthUser';
import {User, UserPen} from 'lucide-react'
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';
const NavBar = () => {
    const navigate=useNavigate();
    const {authUser,setAuthUser}=useContext(AuthContext);
    const [showDropdown,setShowDropdown]=useState(false);
    const {logout}=useAuth();
    const [loading,setLoading]=useState(false)
    const [modal,setModal]=useState(false);

    const logoutUser=async()=>{
        try{
            setLoading(true)
            await logout();
        }
        finally{
            setLoading(false);
        }
    }
  return (
    <>
   <nav className='bg-none fixed top-0 w-screen flex justify-between px-8 py-4 items-center'>
        
        <Link to="/dash">
            <div>GROCERIO</div>
        </Link>

        <div className=''>
            {!authUser && <button className='text-text-main border rounded px-4 py-2 hover:bg-accent hover:text-white hover:border-none'
                onClick={()=>navigate("/signup")}>Get Started</button>
            }

            {authUser && 
                <div className='flex gap-4 items-center relative'>
                    <button className='btn' onClick={()=>setModal(!modal)}>Create a List</button>
                    <span onClick={()=>setShowDropdown(!showDropdown)} className='z-10 cursor-pointer hover:[border-radius:50%] hover:text-white px-1 py-1.5  hover:bg-accent'><User/></span>

                    <section className={`absolute right-0 mt-4 shadow-md flex flex-col items-center ${showDropdown?"top-full opacity-100 ":"top-0 opacity-0"} `}>
                            <button className='btn border-0 w-full'>Edit Profile</button>
                            <button  onClick={logoutUser} className='btn border-0 w-full'>logout</button>
                    </section>
                </div>
            }
        </div>

        
   </nav>

    {modal && <Modal/>}
    
    {modal && <div onClick={()=>setModal(false)} className='absolute bg-black/30 w-full h-full backdrop-blur-sm'></div>}
   </>
  )
}

export default NavBar
