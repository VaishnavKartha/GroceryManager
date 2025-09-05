import React, { useContext, useEffect, useState } from 'react'
import { useList } from '../../hooks/useList'
import { ListContext } from '../../context/ListManager';
import ListCard from '../../components/ListCard';
import toast from 'react-hot-toast';
import SkeletonLoader from '../../components/SkeletonLoader';
import { AuthContext } from '../../context/AuthUser';

const Dash = () => {
  const {createList,getLists,getSelectedList}=useList();
  const {authUser}=useContext(AuthContext)
  const {userLists}=useContext(ListContext);
  const [skeletonLoading,setSkeletonLoading]=useState(false);
  useEffect(()=>{
    const fetchAllLists=async()=>{
      try{
        setSkeletonLoading(true)
        await getLists();

      }finally{
        setSkeletonLoading(false);
      }
    }
    fetchAllLists();
  },[])

  const handleClick=async(listid)=>{
    try{
      if(listid){
        await getSelectedList(listid)
      }
      else{
        return toast.error("Some Problem Occurs");
      }
    }
    finally{

    }
  }
  
  return (
    <div className='bg-background w-full min-h-screen'>

      <h1 className='text-5xl font-bold mx-8 my-4 '>Welcome,  <span className='text-accent '>{authUser && authUser?.username}</span></h1>
      
      {!skeletonLoading?  userLists.length>0 ?<div className=' mx-4 md:mx-36 lg:mx-44 flex flex-wrap justify-around gap-4'>
       
        {userLists?.map((list,index)=>{
          return <ListCard getListDetails={handleClick} key={list._id} id={list._id} name={list.listname} status={list.status} createdAt={list.createdAt} updatedAt={list.updatedAt}/>
        })}
      </div>:<p className='text-center text-4xl text-gray-500/70'>Start Creating Your Lists</p>:
      <div className=' mx-4 md:mx-36 lg:mx-44 '><SkeletonLoader/></div>}
        
      
    </div>
  )
}

export default Dash
