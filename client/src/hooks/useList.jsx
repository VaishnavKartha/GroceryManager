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
                console.log(error.message);
                
            }
        }
    }

    const createList=async(listname)=>{
        try {
            const {data}=await axiosInstance.post("/list",{listname});
            if(data.success){
                toast.success(data.message)
                await getLists();
            }
            
        } catch (error) {
            console.log(error.message)
        }

    }

     const getLists=async()=>{
        try {
            const {data}=await axiosInstance.get("/list");
            if(data.success){
                console.log(data.lists)
                setUserLists(data.lists)
            }
            
        } catch (error) {
            console.log(error.message)
        }

    }

    const getSelectedList=async(listid)=>{
         try {
      

      // Check if we already have a locally edited draft
      const localList = JSON.parse(localStorage.getItem("currentList"));
      if (localList && localList.listid === listid) {
        setCurrentList(localList);
        navigate(`/dash/${listid}`);
        return;
      }

      // Otherwise fetch from API
      const { data } = await axiosInstance.get(`/list/${listid}`);
      if (data.success) {
        setCurrentList(data.itemsList);

        // Save a draft copy locally
        localStorage.setItem("currentList", JSON.stringify(data.itemsList));

        navigate(`/dash/${listid}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching list:", error.message);
      toast.error("Failed to fetch list");
    } finally {
      
    }
  }

  const saveList=async(listdata)=>{
    try {
        const {data}=await axiosInstance.post("/list/savelist",listdata)
        if(data.success){
            localStorage.removeItem("currentList");
            //setCurrentList(data.newList);
            await getSelectedList(listdata.listid);
            toast.success("Updation Successfull")
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }

    

    return {createList,getLists,getSelectedList,localStorageManager,syncLocalStorage,saveList}
}