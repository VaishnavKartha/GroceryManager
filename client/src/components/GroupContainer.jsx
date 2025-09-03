import React, { useContext, useState } from 'react'
import ListCard from './ListCard'
import { useList } from '../hooks/useList';
import { ListContext } from '../context/ListManager';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGroups } from '../hooks/useGroups';

const GroupContainer = ({details,selectedGroup,setSelectedGroup}) => {
    const {getSelectedList}=useList();
    const {leaveGroup,deleteGroup}=useGroups();
    const {currentList}=useContext(ListContext);
    const navigate=useNavigate();
    const {pathname}=useLocation();
    const [loading,setLoading]=useState(false);

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
    <div className='w-full h-full'>
        <header className='border-b px-4 py-2 flex items-center justify-between'>

            <div>
                <h3 className='text-xl'>{details?.name}</h3>
                <p className='text-[12px]'>Members : {details?.users?.length}</p>
            </div>

            <div>
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
      
    </div>
  )
}

export default GroupContainer
