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
                console.log(data.wholeInventory);
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
                console.log(data.categories)
                return data.categories
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

    return {getFullInventory,getCategories,itemsByCategory,searchString}
}