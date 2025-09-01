import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
    const intervalRef=useRef();
    const introArray="Manage Your Shopping List Using Grocerio".split("");
    const [index,setIndex]=useState(0);
    useEffect(()=>{
        
        intervalRef.current=setInterval(()=>{
            
            setIndex((prevIndex)=>{
                if(prevIndex<introArray.length){
                    
                    return prevIndex+1
                }
                else{
                    clearInterval(intervalRef.current);
                    return prevIndex
                }
            })
            
        },75)

        return ()=>clearInterval(intervalRef.current);
    },[])
  return (
    <div className='bg-primary w-full h-screen'>
        <div className='p-24 text-background'>
            <h1 className='text-8xl pb-12'>Missed Something During Shopping?</h1>
            <h2 className={`text-6xl ${index<introArray.length&&"subtitle"}`}>{introArray.slice(0,index).join("")}</h2>
        </div>
    </div>
  )
}

export default Home
