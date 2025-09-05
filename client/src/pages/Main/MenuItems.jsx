import React, { useContext, useEffect, useState } from 'react'
import SearchArea from '../../components/SearchArea'
import ListPreview from '../../components/ListPreview'
import { useInventory } from '../../hooks/useInventory';
import { useList } from '../../hooks/useList';
import Loader from '../../components/Loader';
import { ListContext } from '../../context/ListManager';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MenuItems = () => {
    const {getFullInventory,itemsByCategory}=useInventory();
    const [loading,setLoading]=useState(false);
    const {listid}=useParams();
    const [selectedCategory,setSelectedCategory]=useState([]);
    const {localStorageManager,saveList,getSelectedList}=useList();
    const [showSearchArea,setShowSearchArea]=useState(true);
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

    useEffect(()=>{
        const getByCategory=async()=>{
          await itemsByCategory(selectedCategory)
        }
        getByCategory();
      },[selectedCategory])

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
        <button className='cursor-pointer hover:bg-gray-400/30 rounded-full' onClick={()=>setShowSearchArea(!showSearchArea)}>{showSearchArea?<ChevronDown/>:<ChevronUp/>}</button>
        <div className={` overflow-hidden w-[250px] sm:w-[500px]  lg:w-[80%] relative ${showSearchArea?"lg:h-[800px]":"h-0"} transition-all duration-400 ease-in-out`}>
          
            <SearchArea selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        </div>
      <div className=' mb-12 overflow-y-auto lg:w-[80%]'>
        <ListPreview/>
      </div>
    </div>
  )
}

export default MenuItems
