import React from 'react'

const SkeletonLoader = ({height=250}) => {
  return (
    <div className='flex flex-wrap w-full h-full gap-4 m-4'>

        {new Array(6).fill().map((_,index)=>{
            return <div key={index} style={{height:`${height}px`}} className='w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] animate-pulse bg-gray-400/70 rounded-2xl shadow-xl'/>
        })}
      
    </div>
  )
}

export default SkeletonLoader
