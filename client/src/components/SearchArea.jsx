import React from 'react'
import {ListFilter} from 'lucide-react'
import { useContext } from 'react'
import { ListContext } from '../context/ListManager'
import ItemCard from './ItemCard'
import { useState } from 'react'
import { useEffect } from 'react'
import { useInventory } from '../hooks/useInventory'
import SkeletonLoader from './SkeletonLoader'
import { useDebounce } from '../hooks/useDebounce'
import { useNavigate } from 'react-router-dom'
const SearchArea = ({selectedCategory="",setSelectedCategory=()=>{}}) => {
    const navigate=useNavigate();
    const {inventory}=useContext(ListContext);
    const [openFilter,setOpenFilter]=useState(false)
    const {getCategories,searchString,getFullInventory}=useInventory();
    const [searchText,setSearchText]=useState("");
    const [categories,setCategories]=useState([]);
    const debouncedValue=useDebounce(searchText)
    const [skeletonLoading,setSkeletonLoading]=useState(false);


    useEffect(()=>{
        const fetchCategories=async()=>{
            const category=await getCategories();
            setCategories(category);
        }
        fetchCategories();
    },[])

    useEffect(()=>{
        const sendQuery=async()=>{
            try{
                setSkeletonLoading(true)
                if(!searchText.trim()){
                    await getFullInventory();
                    return
                }
                await searchString(searchText);
            }finally{
                setSkeletonLoading(false);
            }
           
        }
        sendQuery();

    },[debouncedValue])

    const handleClick=async(cat)=>{
        let tempSelected=selectedCategory;
        const itemPresent=tempSelected?.includes(cat._id);

        
        if(itemPresent){
            //console.log(itemPresent)
            setSelectedCategory("");
            await getFullInventory()
            return
        }

        tempSelected=cat._id;
        setSelectedCategory(tempSelected)
    }

 


    //console.log(selectedCategory)
  return (
    <>
        <div className='shadow-md h-full rounded-2xl bg-white/60 backdrop-blur-md' style={{backgroundImage:`linear-gradient(to bottom,rgba(22,163,74,0.6) 50px,rgba(255,255,255,0.8) 20%)`}}>
        <header className='w-full flex flex-col px-2 py-4 items-start'>
            <div  className='w-full flex gap-2 items-center relative'>

                <input
                className='flex-1 input-field rounded-2xl text-[20px] text-text-main '
                type='text'
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                placeholder='Search....'/>


                <button className='cursor-pointer' onClick={()=>setOpenFilter(!openFilter)}><ListFilter/></button>


                 <div className={`z-30 rounded-xl bg-accent/60 backdrop-blur-md absolute transform top-full  ${openFilter?"translate-y-2 opacity-100":"-translate-y-4 opacity-0 pointer-events-none"} transition-all duration-200 ease-in-out right-0 px-8 py-4 `}>
                        <h3 className='font-semibold text-[18px]'>Choose By Category</h3>

                        {categories?.length>0 && <ul className='pt-8'>
                            {categories?.map((cat,index)=>{
                                return <li key={cat._id} onClick={()=>{handleClick(cat);setOpenFilter(false)}} className='cursor-pointer mb-2 hover:text-background'>{cat.name}</li>
                            })}
                        </ul>}
                    </div>
                
                



            </div>
            <span className='flex gap-4 items-center pt-2'>
                <p>Couldn't find what you were looking for ?</p>
                <button onClick={()=>navigate("/addNew")} className='btn bg-accent hover:bg-accent/90 active:bg-accent/80 border-none text-white'>Add Item</button>    
            </span>
        </header>

        <main className='px-2 py-4 flex w-full max-lg:gap-4 lg:flex-wrap lg:h-[600px] items-start lg:justify-between overflow-scroll'>
                {!skeletonLoading? inventory?.length>0 && inventory.map((item,index)=>{
                    return <ItemCard key={item._id} id={item._id} name={item.itemName} cost={item.cost} category={item?.category?.name} image={item.image}/>
                }) :<SkeletonLoader/>}
        </main>
        </div>

        
    </>
  )
}

export default SearchArea
