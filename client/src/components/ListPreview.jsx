import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { ListContext } from '../context/ListManager'
import { useEffect } from 'react'
import { useList } from '../hooks/useList'
import { Trash } from 'lucide-react'

const ListPreview = () => {
    const {currentList,setCurrentList,userLists,inventory}=useContext(ListContext);
    const {syncLocalStorage}=useList();
    
    useEffect(()=>{
        totalCost();
    },[currentList])
    const totalCost=()=>{
        const {contents:tempList}=currentList
        console.log(tempList)

        const sum=tempList.reduce((acc,item)=>(acc+(item?.item?.cost * item.quantity)),0)
        console.log(sum)
        return sum
    }

    const handleClick=(idx)=>{
        setCurrentList((prevList)=>{
            const updatedList={...prevList}
            //updatedList.contents[idx].quantity=0;
            updatedList.contents=updatedList.contents.filter((_,index)=>index!==idx);
            syncLocalStorage(updatedList)
            return updatedList
            

        })
    }


    
    console.log(currentList);
  return (
    <div className='rounded-2xl border border-gray-500/40 py-4 relative'>
      <section>

      </section>


      <section className='w-full overflow-scroll'>

        <div className='w-full flex justify-around mb-8'>
            <span>Purchased</span>
            <span>Item</span>
            <span>Quantity</span>
            <span>Price/item</span>
            <span>Delete</span>
        </div>

        <section className='flex flex-col gap-4 px-4 overflow-scroll'>

            {currentList?.contents?.length && currentList?.contents?.map((content,index)=>{
                return <div key={content?._id} className=' rounded-2xl w-full grid grid-cols-5 pb-4 border border-gray-500/60 place-items-center '>

                    <input
                    type='checkbox'/>
                    
                    <p>{content?.item?.itemName}</p>
                    <p>{content?.quantity}</p>
                    <p>{content?.item?.cost}</p>

                    <button onClick={()=>handleClick(index)} className='cursor-pointer'><Trash size={"18px"} stroke='red'/></button>

                </div>
            })}
        </section>
        
      </section>

      <div className='w-full absolute bottom-0 text-2xl flex justify-center'>
            <p>Estimated Total :{totalCost()} </p>
        </div>
    </div>
  )
}

export default ListPreview
