import { CircleChevronLeft } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import Loader from './Loader'
import { useGroups } from '../hooks/useGroups';
import { AuthContext } from '../context/AuthUser';

const AddMembers = ({groupDetails,setGroupDetails=()=>{}}) => {
    const [loading,setLoading]=useState(false);
    const {getAllUsers,addUsers,getGroupDetails}=useGroups();
    const [selectedUserId,setSelectedUserId]=useState([])
    const {authUser,users}=useContext(AuthContext);
    useEffect(()=>{
            const fetchAllUsers=async()=>{
                await getAllUsers();
                
            }
            fetchAllUsers();
        },[])

    const handleClick=(id)=>{
        let tempList=[...selectedUserId];

        const isPresent=tempList.find((userId)=>userId===id);

        if(isPresent){
            tempList=tempList.filter((userid)=>userid !== id)
        }
        else{
            tempList.push(id);
        }

        setSelectedUserId(tempList)
    }
    console.log(selectedUserId);

    const addUsersToGroup=async()=>{
        try{
            setLoading(true)
            if( groupDetails && groupDetails._id){
                await addUsers(groupDetails._id,selectedUserId)
                const result=await getGroupDetails(groupDetails._id);
                setGroupDetails(result);
            }
           
        }
        finally{
            setLoading(false)
        }
    }


  return (
    <div className='h-full flex flex-col'>
       <h2 className='font-semibold text-2xl mb-8 my-2'>Add Members</h2>
                <h3>Select Members</h3>
                <div className='h-full overflow-scroll w-[80%] px-4 py-2 border border-gray-500/60 rounded-2xl'>
                    <ul>
                            {users && users
                                .filter(u => !groupDetails?.users?.some(member => member._id === u._id))
                                .map((user, index) => (
                                    <li
                                    key={index}
                                    onClick={() => handleClick(user._id)}
                                    className={`cursor-pointer rounded-2xl shadow-xl mb-2 px-4 py-1 font-semibold ${selectedUserId?.includes(user._id) ? "bg-primary/60" : ""}`}
                                    >
                                    {user.username}
                                    </li>
                                ))}

                    </ul>
                </div>
                <div className='w-full flex justify-end'>
                    <button disabled={loading} onClick={addUsersToGroup} className='btn ml-auto'>{loading?<Loader/>:"Add"}</button>
                </div>
    </div>
  )
}

export default AddMembers
