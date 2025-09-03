import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGroups } from '../../hooks/useGroups';
import { AuthContext } from '../../context/AuthUser';
import {ChevronsLeft, ChevronsRight, Home} from 'lucide-react'
import GroupLists from '../../components/GroupLists';
import Modal from '../../components/Modal';
import toast, { Toaster } from 'react-hot-toast';
import GroupContainer from '../../components/GroupContainer';
import { useList } from '../../hooks/useList';
const GroupShare = () => {
    const {userid}=useParams();
    const {getGroups,getGroupDetails}=useGroups();
    const navigate=useNavigate();
    const {userGroups}=useContext(AuthContext);
    const [open,setOpen]=useState(false);
    const [modal,setModal]=useState(false);
    const [selectedGroup,setSelectedGroup]=useState(null);
    const [selectedGroupDetails,setSelectedGroupDetails]=useState(null);
    useEffect(()=>{
        const fetchUserGroups=async()=>{
            await getGroups();
        }
        fetchUserGroups();
    },[])

    useEffect(()=>{
        if(!selectedGroup)return
        
        fetchDetails();

    },[selectedGroup])

    const fetchDetails=async()=>{
            const result=await getGroupDetails(selectedGroup);
            setSelectedGroupDetails(result);
        }

    const handleCreate=()=>{
        if(!selectedGroup){
            return toast.error("Please Select a Group First");
        }
        setModal(!modal)
    }

    


  return (
    <>
        {modal  && <div onClick={()=>setModal(false)} className=' z-40 fixed bg-black/30 w-full h-full backdrop-blur-sm border'></div>}

        <div  className='flex justify-around items-center mt-4'>
            <button onClick={()=>navigate("/dash")}><Home size={"18px"}/></button>
            <button onClick={handleCreate} className='btn'>Create List</button>
        </div>
        <div className='flex h-screen border m-8 mt-1 overflow-hidden relative'>
            
            <section className={`overflow-hidden z-20 sticky left-0 top-0 w-0 lg:w-[200px] h-full border-r ${open?"w-[200px]":"w-0"} transition-all duration-200 ease-in-out `}>
                <GroupLists selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>
            </section>

            <section className='flex-1 bg-gray-300/30'>

            {(!selectedGroupDetails || !selectedGroup) && 
                <div className='h-full w-full flex justify-center items-center'>
                    <h1 className='text-center text-3xl text-gray-600/60'>Please Select a Group</h1>
                </div>
            }

            {(selectedGroupDetails && selectedGroup) && <GroupContainer details={selectedGroupDetails}/>}

            </section>

            {!open ?<span className='absolute -left-1 top-0 lg:hidden transition-all duration-200 ease-in-out' onClick={()=>setOpen(true)}><ChevronsRight/></span>:
            <span className='z-30 absolute left-[200px] transform -translate-x-full top-0 lg:hidden transition-all duration-200 ease-in-out' onClick={()=>setOpen(false)}><ChevronsLeft/></span>}
        </div>

        {modal && <Modal setModal={setModal} group={true} selectedGroup={selectedGroup}/>}

    </>
  )
}

export default GroupShare
