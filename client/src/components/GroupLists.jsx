import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthUser';
import SkeletonLoader from './SkeletonLoader';

const GroupLists = ({selectedGroup,setSelectedGroup,skeletonLoading}) => {
    const {userGroups}=useContext(AuthContext);
    const handleClick=(groupid)=>{
        if (selectedGroup===groupid){
            setSelectedGroup("");
        }
        else{
            setSelectedGroup(groupid)
        }

    }
  return (
    <div>
        <h2 className='text-center text-xl font-semibold py-4'>Groups</h2>
        {!skeletonLoading?<ul>
            {userGroups?.groupid && userGroups?.groupid?.map((group,index)=>{
                return <li 
                            key={group._id}
                            onClick={()=>handleClick(group._id)} 
                            className='border-b py-4 px-1.5 text-[15px] hover:bg-gray-400/20 cursor-pointer'>

                                {group.name}
                        </li>
            })}
        </ul> : <SkeletonLoader height={50}/>}
      
    </div>
  )
}

export default GroupLists
