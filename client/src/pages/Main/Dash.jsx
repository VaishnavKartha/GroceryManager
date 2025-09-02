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

      <div className=' mx-4 md:mx-36 lg:mx-44 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center'>
        {userLists?.map((list,index)=>{
          return <ListCard getListDetails={handleClick} key={list._id} id={list._id} name={list.listname} status={list.status} createdAt={list.createdAt} updatedAt={list.updatedAt}/>
        })}
      </div>
        
      
    </div>
  )
}

export default Dash
