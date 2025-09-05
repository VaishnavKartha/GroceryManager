import { useContext } from "react"
import { axiosInstance } from "../utils/axios"
import { ListContext } from "../context/ListManager"
import toast from 'react-hot-toast'

export const useInventory=()=>{

    const {setInventory}=useContext(ListContext);

    const getFullInventory=async()=>{
        try {
            const {data}=await axiosInstance.get("/inventory")
            if(data.success){
                
                setInventory(data.wholeInventory);

            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const getCategories=async()=>{
        try {
            const {data}=await axiosInstance.get("/inventory/categories");
            if(data.success){
               
                return data.categories
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const addNewItem=async(itemData)=>{
        try {
            const {data}=await axiosInstance.post("/inventory/add",itemData)
            if(data.success){
                await getFullInventory();
                return toast.success(data.message)
            }
        } catch (error) {
             toast.error(error.response.data.message);
        }
    }

    const itemsByCategory=async(querydata)=>{
        try {
            const {data}=await axiosInstance.get("/inventory/category",{
                params:{
                    category:querydata
                },
                paramsSerializer:(params)=>new URLSearchParams(params).toString(),
            })

            if(data.success){
                setInventory(data.newInventory);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }

    const searchString=async(searchText)=>{
        try {
            const {data}=await axiosInstance.get("/inventory/search",{
                params:{
                    text:searchText
                }
            })

            if(data.success){
                setInventory(data.items)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return {getFullInventory,getCategories,addNewItem,itemsByCategory,searchString}
}