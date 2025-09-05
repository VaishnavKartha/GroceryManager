import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthUser';
import {User, UserPen} from 'lucide-react'
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';
import { useList } from '../hooks/useList';
import toast from 'react-hot-toast';
import { useGroups } from '../hooks/useGroups';
import Loader from './Loader';
import CreateGroupModal from './CreateGroupModal';
const NavBar = () => {
    const navigate=useNavigate();
    const {authUser,setAuthUser}=useContext(AuthContext);
    
    const [showDropdown,setShowDropdown]=useState(false);
    const {logout}=useAuth();
    const [loading,setLoading]=useState(false)
    const [modal,setModal]=useState(false);
    const [createModal,setCreateModal]=useState(false);
    

    useEffect(()=>{
        if(modal){
            document.body.style.overflow="hidden";
        }
        else{
            document.body.style.overflow="auto";
        }

        return ()=>document.body.style.overflow="auto";
    },[modal])
    

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
   <nav className='z-50  bg-primary bg-none sticky top-0 w-screen flex justify-between px-8 py-4 items-center '>
        
        <Link to="/dash">
            <div className='text-white font-bold text-2xl'>GROCERIO</div>
        </Link>

        <div className=''>
            {!authUser && <button className='text-white border rounded px-4 py-2 hover:bg-accent hover:text-white hover:border-none'
                onClick={()=>navigate("/signup")}>Get Started</button>
            }

            {authUser && 
                <div className='flex gap-4 items-center relative'>
                    <button className='btn text-white border border-text-main' onClick={()=>setModal(!modal)}>Create a List</button>
                    <span onClick={()=>setShowDropdown(!showDropdown)} className='z-10 cursor-pointer hover:[border-radius:50%] hover:text-white px-1 py-1.5  hover:bg-accent'><User/></span>

                    <section className={`absolute right-0 mt-4 shadow-md flex flex-col items-center ${showDropdown?"top-full opacity-100 ":"top-0 opacity-0"} `}>
                            <button onClick={()=>{setCreateModal(!createModal);setShowDropdown(false)}} className='btn border-0 w-full'>Create Group</button>
                            <button className='btn border-0 w-full' onClick={()=>navigate(`/group/${authUser?._id}`)}>View Groups</button>
                            <button  onClick={logoutUser} className='btn border-0 w-full'>logout</button>
                    </section>
                </div>
            }
        </div>

        
   </nav>

    {modal && <Modal setModal={setModal}/>}

    {createModal && <CreateGroupModal/>}
    
    {(modal || createModal)  && <div onClick={()=>{setModal(false);setCreateModal(false)}} className='z-40 absolute bg-black/30 w-full h-full backdrop-blur-sm'></div>}
   </>
  )
}

export default NavBar
