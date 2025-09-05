import { Trash } from 'lucide-react';
import React, { useState } from 'react'
import shopping from '../assets/shopping.jpg'
import { useList } from '../hooks/useList';
const ListCard = ({getListDetails=()=>{},id,name,status,createdAt,updatedAt}) => {
    const {deleteList}=useList();
    const formatDate=(date)=>{
        const newDate=new Date(date);
        return newDate.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})
    }
    
  return (
    <div onClick={()=>getListDetails(id)} className=' cursor-pointer h-[200px] md:h-[250px] lg:h-[300px]  rounded shadow-lg list-card'>

        <img src={shopping} className="h-full w-full object-cover object-center rounded"/>

        <span onClick={(e)=>{e.stopPropagation();deleteList(id)}} className=' absolute right-0 top-0 hover:bg-text-sec/30 px-1 py-0.5'><Trash size={"20px"} stroke='red'/></span>

        <div className={`shadow-[-0.5px_-0.5px_18px] backdrop-blur-md text-text-main bg-accent/70  w-full h-[100px]  slide-container `}>
            <h3 className='text-center text-xl lg:text-2xl'>{name}</h3>

            <div>
                <span className='flex justify-between px-4 text-sm'>
                    <p>Status</p>
                    <p>{status?"Finished":"Ongoing"}</p>
                </span>

                <span className='flex justify-between px-4 text-sm'>
                    <p>Last Updated: </p>
                    <p>{formatDate(updatedAt)}</p>
                </span>

                <span className='flex justify-between px-4 text-sm'>
                    <p>Created At: </p>
                    <p>{formatDate(createdAt)}</p>
                </span>
            </div>
        </div>
      
    </div>
  )
}

export default ListCard
