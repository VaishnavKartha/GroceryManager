import React, { useContext, useState } from 'react'
import ListCard from './ListCard'
import { useList } from '../hooks/useList';
import { ListContext } from '../context/ListManager';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGroups } from '../hooks/useGroups';
import { ChevronDown, Info } from 'lucide-react';
import GroupDetailsPanel from './GroupDetailsPanel';

const GroupContainer = ({details,selectedGroup,setSelectedGroup}) => {
    const {getSelectedList}=useList();
    const {leaveGroup,deleteGroup}=useGroups();
    const {currentList}=useContext(ListContext);
    const navigate=useNavigate();
    const {pathname}=useLocation();
    const [loading,setLoading]=useState(false);
    const [openDetailsPanel,setOpenDetailsPanel]=useState(false);
    const [openSidebar,setOpenSideBar]=useState(false);
    const isNestedRoute=pathname?.includes("/list/");
    console.log(currentList);
    console.log(details)
    const handleClick=async(listid)=>{
        if(!listid)return

        await getSelectedList(listid,true)
        navigate(`list/${listid}`);
    }

    const handleLeave=async()=>{
        try{
            setLoading(true);
            await leaveGroup(details?._id)
            setSelectedGroup(null);
        }finally{
            setLoading(false);
        }
    }

    const handleDelete=async()=>{
        try{
            setLoading(true);
            await deleteGroup(details?._id)
            setSelectedGroup(null);
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='w-full h-full relative'>
        <header className='border-b px-4 py-2 flex items-center justify-between relative '>

            <div className='flex gap-4'>
                <div>
                    <h3 className='text-xl'>{details?.name}</h3>
                    <p className='text-[12px]'>Members : {details?.users?.length}</p>
                </div>

                <button 
                className='cursor-pointer px-3 rounded-full hover:bg-gray-400/20'
                onClick={()=>setOpenDetailsPanel(!openDetailsPanel)}>
                    <Info/>
                </button>
                
            </div>

            
            <button onClick={()=>setOpenSideBar(!openSidebar)} className='z-50 md:hidden absolute right-4'><ChevronDown/></button>
            <div className={`flex md:opacity-100 max-md:absolute md:translate-y-0 max-md:z-40 max-md:right-0 max-md:flex-col transform ${openSidebar?"opacity-100 bg-background translate-y-full":"opacity-0 translate-y-0 "} transition-transform duration-200 ease-in-out`}>
                <button className='btn mr-4' onClick={handleLeave} disabled={loading} >Leave Group</button>
                <button className='btn border-0 text-background hover:border bg-accent hover:bg-transparent hover:text-text-main' onClick={handleDelete} disabled={loading} >Delete Group</button>
            </div>
            
        </header>

        <main className='px-2 md:px-8 py-4 overflow-scroll h-[calc(100vh-70px)]  '>
            {!isNestedRoute && <div className='flex flex-wrap gap-4'>
                {details?.list?.length && details?.list?.map((item,index)=>{
                    return <ListCard getListDetails={handleClick} key={item._id} id={item._id} name={item.listname} status={item.status} createdAt={item.createdAt} updatedAt={item.updatedAt}/>
                })}
            </div>}

            <Outlet/>
        </main>

         <GroupDetailsPanel open={openDetailsPanel} setOpen={setOpenDetailsPanel} details={details}/>
      
    </div>
  )
}

export default GroupContainer
