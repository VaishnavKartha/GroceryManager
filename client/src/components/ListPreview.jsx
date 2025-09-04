import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { ListContext } from '../context/ListManager'
import { useEffect } from 'react'
import { useList } from '../hooks/useList'
import { Expand, Trash } from 'lucide-react'

const ListPreview = () => {
    const {currentList,setCurrentList,userLists,inventory}=useContext(ListContext);
    const {syncLocalStorage}=useList();

    
    useEffect(()=>{
        getListName();
    },[])


    useEffect(()=>{
        totalCost();
    },[currentList])

    

    console.log(currentList);

    const totalCost=()=>{

        const tempList = currentList?.contents || [];
        console.log(tempList)

        const sum=tempList.reduce((acc,item)=>(acc+(item?.item?.cost * item.quantity)),0)
        console.log(sum)
        return sum
    }

    const getListName=()=>{
        const list =userLists.find((list,_)=>list._id===currentList.listid);
        if(list){
            return list.listname
        }
        else return
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

    const handleChange=(e,index)=>{
        const {value,checked}=e.target
       setCurrentList((prevList)=>{
                const tempList={...prevList}

                tempList.contents[index].purchased=checked    
                syncLocalStorage(tempList)
                return tempList
            })
        console.log(value)
    }


    
    console.log(currentList);
  return (
    <div className='rounded-2xl border border-gray-500/40 pt-1 pb-4 relative'>
      <section className='mb-8'>
            <h2 className='text-center text-2xl font-semibold'>{getListName()}</h2>
      </section>

      <button className='absolute right-0 top-0'><Expand/></button>


      <section className='w-full overflow-scroll'>

        <div className='w-full flex justify-around mb-8'>
            <span>Purchased</span>
            <span>Item</span>
            <span>Quantity</span>
            <span>Price/item</span>
            <span>Delete</span>
        </div>

        <section className='flex flex-col gap-4 px-4 overflow-scroll mb-12'>

            {currentList?.contents?.length && currentList?.contents?.map((content,index)=>{
                return <div key={content?._id} className=' rounded-2xl w-full grid grid-cols-5 pb-4 border border-gray-500/60 place-items-center '>

                    <input
                    type='checkbox'
                    value={content?.purchased}
                    checked={content?.purchased}
                    onChange={(e)=>handleChange(e,index)}/>
                    
                    <p>{content?.item?.itemName}</p>
                    <p>{content?.quantity}</p>
                    <p>{content?.item?.cost}</p>

                    <button onClick={()=>handleClick(index)} className='cursor-pointer'><Trash size={"18px"} stroke='red'/></button>

                </div>
            })}
        </section>
        
      </section>

      <div className='w-full absolute bottom-0 text-2xl flex justify-center'>
            <p>Estimated Total : {totalCost()} Rs </p>
        </div>
    </div>
  )
}

export default ListPreview
