import React, { useState } from 'react'
import Loader from './Loader'
import toast from 'react-hot-toast'
import { useList } from '../hooks/useList'
import { useGroups } from '../hooks/useGroups'
const Modal = ({setModal,group=false,selectedGroup}) => {
    const [listname,setListname]=useState("")
    const [loading,setLoading]=useState(false);
    const {createList}=useList();
    const {getGroupDetails}=useGroups();

    const handleClick=async()=>{
      

      if(!listname.trim()){
        return toast.error("List Name is required")
      }


      else{
        setLoading(true)
        try{
          if(!group){
            await createList({listname});
          }
          else{
            
              await createList({listname,selectedGroup});
              const result=await getGroupDetails(selectedGroup);
              setSelectedGroupDetails(result);
            
            
          }
        }
        finally{
          setLoading(false);
          setModal(false);
        }
      }

    }


  return (
    <section className=' text-text-main z-50 px-4 py-2 flex flex-col bg-background rounded absolute w-[min(90%,400px)] h-[60vh] md:h-[40vh] lg:h-[50vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md'>
        <h2 className='text-[18px]'>
            Create Your Shopping List !
        </h2>
        
        <div className='w-full mt-8'>
            <h3 className='text-[15px]'>Whats Your List Name ?</h3>

            <input 
                className='w-full input-field'
                type='text'
                value={listname}
                onChange={(e)=>setListname(e.target.value)}
                placeholder='eg. Weekend Shooping'/>
        </div>

        <button disabled={loading} onClick={handleClick} className='btn self-end mt-auto'>{loading ? <Loader/> : "Create"}</button>
    </section>
  )
}

export default Modal
