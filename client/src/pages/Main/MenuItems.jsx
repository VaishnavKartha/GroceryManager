import React, { useContext, useEffect, useState } from 'react'
import SearchArea from '../../components/SearchArea'
import ListPreview from '../../components/ListPreview'
import { useInventory } from '../../hooks/useInventory';
import { useList } from '../../hooks/useList';
import Loader from '../../components/Loader';
import { ListContext } from '../../context/ListManager';
import { useParams } from 'react-router-dom';

const MenuItems = () => {
    const {getFullInventory,itemsByCategory}=useInventory();
    const [loading,setLoading]=useState(false);
    const {listid}=useParams();
    const {localStorageManager,saveList,getSelectedList}=useList();
    const {currentList}=useContext(ListContext);
    useEffect(()=>{
        const fetchInventory=async()=>{
            await getFullInventory();
        }
        fetchInventory();

        const fetchCurrentList=async()=>{
            await getSelectedList(listid,true);
        }
        fetchCurrentList();

        //localStorageManager();

        },[])

    const handleClick=async()=>{
    try{
      setLoading(true)
      await saveList(currentList,true);
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='overflow-y-auto h-[calc(100vh-70px)]  '>
        <div className='flex justify-end'>
            <button className='btn' onClick={handleClick} disabled={loading}>{loading?<Loader/>:"Save List"}</button>
        </div>
        <div className='lg:h-[800px] overflow-hidden  w-[500px] lg:w-[80%]'>
            <SearchArea />
        </div>
      <div className=' mb-12 overflow-y-auto lg:w-[80%]'>
        <ListPreview/>
      </div>
    </div>
  )
}

export default MenuItems
