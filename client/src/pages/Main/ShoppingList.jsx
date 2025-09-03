import React from 'react'
import SearchArea from '../../components/SearchArea'
import ListPreview from '../../components/ListPreview'
import { useEffect } from 'react'
import { useInventory } from '../../hooks/useInventory'
import { useContext } from 'react'
import { ListContext } from '../../context/ListManager'
import { useList } from '../../hooks/useList'
import { useState } from 'react'
import Loader from '../../components/Loader'
import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ShoppingList = () => {

  const navigate=useNavigate();
  const {getFullInventory,itemsByCategory}=useInventory();
  const {currentList,setCurrentList}=useContext(ListContext);
  const {localStorageManager,saveList}=useList();
  const [loading,setLoading]=useState(false);
  const [selectedCategory,setSelectedCategory]=useState([]);
  useEffect(()=>{
    const fetchInventory=async()=>{
      await getFullInventory();
    }
    fetchInventory();

   localStorageManager();

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
      await saveList(currentList);
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='w-full flex flex-col'>
      <div className='flex justify-between items-center'>
        <button onClick={()=>navigate("/dash")} className='ml-8 cursor-pointer'><Home/></button>
        <button disabled={loading} className='btn self-end mr-8 mt-4 ' onClick={handleClick}>{loading?<Loader/>:"Save List"}</button>
      </div>
      <div className='w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 px-4 md:px-36 lg:px-36 xl:px-44 py-8 gap-4'>

        <SearchArea selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <ListPreview/>
        
      </div>
    </div>
  )
}

export default ShoppingList
