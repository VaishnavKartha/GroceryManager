import { CircleChevronLeft, CirclePlus, Plus, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthUser'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AddMembers from './AddMembers';

const GroupDetailsPanel = ({open,setOpen=()=>{},details}) => {

    const [slideOut,setSlideOut]=useState(false);
    const [groupDetails, setGroupDetails] = useState(details);
    const {authUser}=useContext(AuthContext);
     useEffect(() => {
        setGroupDetails(details);
    }, [details]);
  return (
    <div 
    className={`px-2 py-2 absolute w-full md:w-3/5 lg:w-2/5 h-[70%] rounded-2xl left-2 shadow-lg top-1/12 z-50 
                bg-white/40 backdrop-blur-lg transform ${!open?"-translate-y-4 opacity-0 invisible pointer-events-none ":"pointer-events-auto  translate-y-0 opacity-100 visible "} 
                transition-all duration-200 ease-in-out overflow-x-hidden`}>
        <div className='flex justify-between'>
            {slideOut ? <button onClick={()=>setSlideOut(false)} className='cursor-pointer hover:animate-slideLeft'><CircleChevronLeft/></button> : <span></span>}
            <button className='cursor-pointer' onClick={()=>setOpen(false)}><X/></button>
        </div>

        {!slideOut ? <div className={`transform ${slideOut?"-translate-x-full opacity-0 invisible":"translate-x-0 opacity-100 visible"} transition-all duration-200 ease-in-out `}>
            <div className='flex gap-4'>
                <h2 className='text-2xl m-0 p-0 font-semibold'>Members</h2>
                <button className='cursor-pointer' onClick={()=>setSlideOut(true)}><CirclePlus stroke='green'/></button>
            </div>
            <section className='w-[90%] md:w-[80%] h-[60%] overflow-y-auto mt-4 bg-gray-100/60 shadow-md p-1'>
                <ol className='list-decimal flex flex-col gap-2'>
                    {groupDetails?.users && groupDetails?.users?.map((user,index)=>{
                            
                        return <li key={index} className='mx-auto w-[90%]'>{user._id===authUser?._id?"You":user.username}</li>
                    })}
                </ol>

            </section>
        </div> :
        
        <AddMembers groupDetails={groupDetails} setGroupDetails={setGroupDetails}/>}
      

      
    </div>
  )
}

export default GroupDetailsPanel
