import React, { useContext } from 'react'
import ListCard from './ListCard'
import { useList } from '../hooks/useList';
import { ListContext } from '../context/ListManager';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const GroupContainer = ({details}) => {
    const {getSelectedList}=useList();
    const {currentList}=useContext(ListContext);
    const navigate=useNavigate();
    const {pathname}=useLocation();

    const isNestedRoute=pathname?.includes("/list/");
    console.log(currentList);
    console.log(details)
    const handleClick=async(listid)=>{
        if(!listid)return

        await getSelectedList(listid,true)
        navigate(`list/${listid}`);
    }

  return (
    <div className='w-full h-full'>
        <header className='border-b px-4 py-2 flex items-center justify-between'>

            <div>
                <h3 className='text-xl'>{details?.name}</h3>
                <p className='text-[12px]'>Members : {details?.users?.length}</p>
            </div>

            <div>
                <button className='btn mr-4'>Leave Group</button>
                <button className='btn'>Delete Group</button>
            </div>
            
        </header>

        <main className='px-2 md:px-8 py-4 overflow-scroll h-[calc(100vh-70px)]  '>
            {!isNestedRoute && <div className='flex flex-wrap gap-4'>
                {details?.list?.length && details?.list?.map((item,index)=>{
                    return <ListCard getListDetails={handleClick} key={item._id} id={item._id} name={item.listname} status={item.status} createdAt={item.createdAt} updatedAt={item.updatedAt}/>
                })}
            </div>}

            <Outlet/>
        </main>
      
    </div>
  )
}

export default GroupContainer
