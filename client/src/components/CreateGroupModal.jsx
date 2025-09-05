import React, { useContext, useEffect, useState } from 'react'
import { useGroups } from '../hooks/useGroups';
import Loader from './Loader';
import { AuthContext } from '../context/AuthUser';
import { useNavigate } from 'react-router-dom';

const CreateGroupModal = () => {
    const {createGroup,getAllUsers,addUsers}=useGroups();
    const [groupName,setGroupName]=useState("");
    const {users,authUser}=useContext(AuthContext);
    const [selectedUserId,setSelectedUserId]=useState([])
    const [loading,setLoading]=useState(false)
    const [step,setStep]=useState(1);
    const [groupDetails,setGroupDetails]=useState({})
    const navigate=useNavigate()


    useEffect(()=>{
        const fetchAllUsers=async()=>{
            await getAllUsers();
            
        }
        fetchAllUsers();
    },[])


    const createNewGroup=async()=>{
        if(!groupName.trim()){
            return toast.error("Group name is required")
        }
        try{
            setLoading(true)
            const newGroup=await createGroup(groupName);
            
            setGroupDetails(newGroup)
            
            setStep(2);
        }
        finally{
            setLoading(false)
        }
    }


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
    

    const addUsersToGroup=async()=>{
        try{
            setLoading(true)
            if( groupDetails && groupDetails._id){
                await addUsers(groupDetails._id,selectedUserId)
                navigate(`/group/${authUser?._id}`);
                
            }
           
        }
        finally{
            setLoading(false)
        }
    }

    
  return (
    
      <section className='text-text-main z-50 px-4 py-2  bg-background rounded absolute w-[min(90%,400px)] h-[60vh] md:h-[40vh] lg:h-[50vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md '>
            {step===1 ? <div className='flex flex-col h-full'>
                <h2 className='font-semibold text-2xl mb-8 my-2'>Create Group</h2>

                <div className='flex flex-col'>
                    <label>Group Name</label>
                    <input
                    type='text'
                    value={groupName}
                    onChange={(e)=>setGroupName(e.target.value)}
                    placeholder='eg. My Group'
                    className='input-field'
                    />
                </div>

                <button onClick={createNewGroup} disabled={loading} className='btn self-end mt-auto'>{loading?<Loader/>:"Create Group"}</button>
            </div>:
            <div className='h-full flex flex-col'>
                <h2 className='font-semibold text-2xl mb-8 my-2'>Add Members</h2>
                <h3>Select Members</h3>
                <div className='h-full overflow-scroll w-[80%] px-4 py-2 border border-gray-500/60 rounded-2xl'>
                    <ul>
                        {users && users.map((user,index)=>{
                            if(user._id !== authUser?._id)return <li key={index} onClick={()=>handleClick(user._id)} 
                                className={`cursor-pointer rounded-2xl shadow-xl mb-2 px-4 py-1 font-semibold ${selectedUserId?.includes(user._id) ? "bg-primary/60":""}`}>
                                
                                    {user.username}
                            </li>
                            return
                            
                        })}
                    </ul>
                </div>
                <div className='w-full flex justify-end'>
                    <button disabled={loading} onClick={addUsersToGroup} className='btn ml-auto'>{loading?<Loader/>:"Add"}</button>
                </div>
            </div>
            }
        </section>
    
  )
}

export default CreateGroupModal
