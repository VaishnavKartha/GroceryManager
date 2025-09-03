import React, { useContext, useEffect } from 'react'
import { useList } from '../../hooks/useList'
import { ListContext } from '../../context/ListManager';
import ListCard from '../../components/ListCard';
import toast from 'react-hot-toast';

const Dash = () => {
  const {createList,getLists,getSelectedList}=useList();
  const {userLists}=useContext(ListContext);
  useEffect(()=>{
    const fetchAllLists=async()=>{
      await getLists();
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
  console.log(userLists);
  return (
    <div className='bg-background w-full min-h-screen'>

      {userLists.length>0 ?<div className=' mx-4 md:mx-36 lg:mx-44 flex flex-wrap justify-around gap-4'>
        {userLists?.map((list,index)=>{
          return <ListCard getListDetails={handleClick} key={list._id} id={list._id} name={list.listname} status={list.status} createdAt={list.createdAt} updatedAt={list.updatedAt}/>
        })}
      </div>:<p className='text-center text-4xl text-gray-500/70'>Start Creating Your Lists</p>}
        
      
    </div>
  )
}

export default Dash
