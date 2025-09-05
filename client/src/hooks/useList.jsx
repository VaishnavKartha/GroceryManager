import { useContext } from "react"
import { axiosInstance } from "../utils/axios"
import toast from 'react-hot-toast'
import { ListContext } from "../context/ListManager"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
export const useList=()=>{
    const {setUserLists,setCurrentList}=useContext(ListContext);
    const navigate=useNavigate();

    const localStorageManager=()=>{
        const localList = localStorage.getItem("currentList");
        if (localList) {
        try {
            setCurrentList(JSON.parse(localList));
        } catch (err) {
            console.error("Failed to parse local list:", err);
            localStorage.removeItem("currentList");
        }
        }
    }

    const syncLocalStorage=(updatedList)=>{
        const localList = localStorage.getItem("currentList");
        if(localList){
            try {
                localStorage.setItem("currentList",JSON.stringify(updatedList));
            } catch (error) {
                toast.error(error.message)
                
            }
        }
    }

    const createList=async(listData)=>{
        try {
            const {data}=await axiosInstance.post("/list",listData);
            if(data.success){
                toast.success(data.message)
                await getLists();
            }
            
        } catch (error) {
            toast.error(error.message)
        }

    }

     const getLists=async()=>{
        try {
            const {data}=await axiosInstance.get("/list");
            if(data.success){
                
                setUserLists(data.lists)
            }
            
        } catch (error) {
            toast.error(error.message)
        }

    }

    const getSelectedList=async(listid,group=false)=>{
         try {
      

      // Check if we already have a locally edited draft
      if(!group){

          const localList = JSON.parse(localStorage.getItem("currentList"));
          if (localList && localList.listid === listid ) {
            setCurrentList(localList);
            if(!group){
                navigate(`/dash/${listid}`);
            }
            return;
          }
      }

      // Otherwise fetch from API
      const { data } = await axiosInstance.get(`/list/${listid}`);
      if (data.success) {
        setCurrentList(data.itemsList);

        // Save a draft copy locally
        localStorage.setItem("currentList", JSON.stringify(data.itemsList));

        if(!group){
            navigate(`/dash/${listid}`);
        }
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching list:", error.message);
      toast.error("Failed to fetch list");
    } finally {
      
    }
  }

  const saveList=async(listdata,group=false)=>{
    try {
        const {data}=await axiosInstance.post("/list/savelist",listdata)
        if(data.success){
            localStorage.removeItem("currentList");
            //setCurrentList(data.newList);
            
                await getSelectedList(listdata.listid,group);
            
            toast.success("Updation Successfull")
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }

  const deleteList=async(listid)=>{
    try {
       
        const {data}=await axiosInstance.delete(`/list/${listid}`)
        if(data.success){
            await getLists();
            toast.success(data.message);

            const localList=JSON.parse(localStorage.getItem("currentList"));

            if(localList && localList.listid===listid){
                localStorage.removeItem("currentList");
            }
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }

    

    return {createList,getLists,getSelectedList,localStorageManager,syncLocalStorage,saveList,deleteList}
}