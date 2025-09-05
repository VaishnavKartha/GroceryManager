import toast from 'react-hot-toast'
import { axiosInstance } from '../utils/axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthUser'
import { useAuth } from './useAuth'
export const useGroups=()=>{
    const {setUsers,setUserGroups}=useContext(AuthContext);
    const {getUser}=useAuth();
    const createGroup=async(groupName)=>{
        try {
            const {data}=await axiosInstance.post("/group/create",{groupName});
            if(data.success){
                
                return data.savedGroup;
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    const getAllUsers=async()=>{
        try {
            const {data}=await axiosInstance.get("/group");
            if(data.success){
                //console.log(data.users)
                setUsers(data.users);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const addUsers=async(groupid,selectedUserId)=>{
        try {
            const {data}=await axiosInstance.post(`/group/add/${groupid}`,{users:selectedUserId});
            if(data.success){
               
                toast.success("Users Added Successfully");
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    const getGroups=async()=>{
        try {
            const {data}=await axiosInstance.get("/group/all");
            if(data.success){
               
                setUserGroups(data.userGroups)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getGroupDetails=async(groupid)=>{
        try {
            const {data}=await axiosInstance.get(`group/get/${groupid}`);
            if(data.success){
                
                return data.groupLists;
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const leaveGroup=async(groupid)=>{
        try {
            const {data}=await axiosInstance.put(`/group/${groupid}/leave`);
            if(data.success){
                toast.success(data.message)//fetch currentUser Again
                await getUser();
                await getGroups();
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const deleteGroup=async(groupid)=>{
        try {
            const {data}=await axiosInstance.delete(`/group/${groupid}`);
            if(data.success){
                toast.success(data.message)//fetch currentUser Again
                await getUser();
                await getGroups();
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    

   

    return {createGroup,getAllUsers,addUsers,getGroups,getGroupDetails,leaveGroup,deleteGroup}
}