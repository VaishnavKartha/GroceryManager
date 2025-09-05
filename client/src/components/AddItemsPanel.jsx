import React from 'react'
import { useEffect } from 'react';
import { useInventory } from '../hooks/useInventory';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './Loader';

const AddItemsPanel = () => {

  const [categories,setCategories]=useState([])
  const {getCategories,addNewItem}=useInventory();
  const [image,setImage]=useState(null);
  const [loading,setLoading]=useState(false)
  const [data,setData]=useState({
    itemName:"",
    cost:"",
    category:""
  })

  useEffect(()=>{
      const fetchCategories=async()=>{  
        const result=await getCategories();
        setCategories(result);
      }
      fetchCategories();
    },[])

    const handleChange=(e)=>{
      const {name,value}=e.target
      setData({...data,[name]:value});
    }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {itemName,cost,category}=data;
    if(!itemName || !cost || !category)return toast.error("Please Fill in all Fields");
    const regex=/^\d+$/;
    if(!regex.test(cost))return toast.error("Give a Valid cost");

    const formData=new FormData();
    formData.append("image",image);
    Object.keys(data).forEach((key)=>formData.append(key,data[key]));
    console.log(formData)
    try{
      setLoading(true)
      await addNewItem(formData);
    }finally{
      setLoading(false)
    }

    
  }
  return (
    <div className='flex justify-center w-screen h-screen items-start my-12'>

      <section className='shadow-lg w-[90%] sm:w-[60%] px-4 py-2'>
        <h1 className='text-2xl sm:text-3xl my-2 text-accent font-bold'>Add Item To Our Inventory</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex justify-center items-center flex-col'>

            <div className="w-28 h-28 aspect-square rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 shadow-md">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <span className="text-gray-500 text-xs">No Image</span>
              )}
            </div>

            <input
            type='file'
            className='border border-gray-300/80'
            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            onChange={(e)=>setImage(e.target.files[0])}/>
          </div>

          <div className=''>
            <div className='flex flex-col mb-4'>
              <label>What is it Called ?</label>
              <input
              className='input-field rounded'
              name="itemName"
              value={data.itemName}
              onChange={handleChange}
              placeholder='item name'
              type='text'/>
            </div>

            <div className='flex max-sm:flex-col gap-4 '>
              <div className='flex flex-col flex-1'>
              <label>Cost (Rs)</label>
              <input
              name="cost"
              value={data.cost}
              onChange={handleChange}
              className='input-field rounded'
              placeholder='Rs'
              type='text'/>
            </div>

            <div className='flex flex-col flex-1'>
              <label>Choose Category</label>
              <select className='rounded input-field' name='category' value={data.category} onChange={handleChange}>
                 <option value="" className='text-sm'>-- Select Category --</option>
                  {categories?.length>0 && categories?.map((category)=>{
                    return <option key={category._id} value={category?._id}>{category?.name}</option>
                  })}
              </select>
            </div>
            </div>

          </div>

          <button className='ml-auto btn' disabled={loading}>{loading?<Loader/>:"Add Item"}</button>

        </form>
      </section>
      
    </div>
  )
}

export default AddItemsPanel
