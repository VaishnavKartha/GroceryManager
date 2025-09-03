import React from 'react'
import {Minus, Plus} from 'lucide-react'
import { useState } from 'react';
import { useContext } from 'react';
import { ListContext } from '../context/ListManager';
import { useList } from '../hooks/useList';
import { useEffect } from 'react';
const ItemCard = ({id,name,cost,category,image}) => {
    const [quantity,setQuantity]=useState(0);
    const{currentList,setCurrentList}=useContext(ListContext);
    const {addNewItem,setAddNewItem}=useState({});
    const {syncLocalStorage}=useList()

    useEffect(()=>{
        const existingItem=currentList?.contents?.find((item)=>item?.item?._id===id );
        if(existingItem){
            setQuantity(existingItem.quantity)
        }
        else{
            setQuantity(0);
        }
    },[currentList,id])


    const decrement=()=>{
        if(quantity==0){
            return
        }   
        const newQuantity=quantity-1;
        setQuantity(newQuantity);
        updateList(newQuantity);
    }

    const increment=()=>{
        const newQuantity=quantity+1
        setQuantity(newQuantity);
        updateList(newQuantity);
    }

    const updateList=(newQuantity)=>{
        setCurrentList((prevList)=>{
            const updatedList={...prevList};
            const existingIndex=updatedList?.contents.findIndex(c=>c.item._id===id);

            if(existingIndex!== -1){
                if(newQuantity===0){
                    updatedList.contents=updatedList.contents.filter((_,index)=>index!==existingIndex)
                }
                else{
                    updatedList.contents[existingIndex].quantity=newQuantity;
                }
            }
            else{
                updatedList.contents.push({
                    item:{_id:id,itemName:name,cost,image},
                    quantity:newQuantity,   
                    purchase:false
                })
            }

            syncLocalStorage(updatedList);
            return updatedList
        })
        
    }



  return (
    <div className='shadow-[-1px_-1px_5px_rgba(0,0,0,0.4)] rounded px-2 py-2  max-sm:min-w-[80%] max-lg:min-w-[40%] lg:min-w-[40%] mt-4 '>
      <div className='h-[150px]'>
        <img src={image || ""} alt={name} className='object-cover object-center'/>
      </div>

      <div className='shadow-[-1px_-1px_5px_rgba(0,0,0,0.4)] p-1 bg-accent/50 backdrop-blur-lg w-full   '>
        <h3 className='text-center text-lg font-semibold'>{name}</h3>
        <span className='flex justify-between text-sm'>
            <p>Price</p>
            <p>{cost}</p>
        </span>

        <span className='flex justify-between text-sm'>
            <p>Type</p>
            <p>{category}</p>
        </span>

        <div className='flex justify-center gap-2 items-center'>
            <button onClick={decrement} className='btn px-1 py-0.5'><Minus size={"15px"}/></button>
            <p>{quantity}</p>
            <button onClick={increment} className='btn px-1 py-0.5'><Plus size={"15px"}/></button>
        </div>

      </div>
    </div>
  )
}

export default ItemCard
