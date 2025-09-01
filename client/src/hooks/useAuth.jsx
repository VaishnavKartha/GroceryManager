import { useContext } from "react";
import { axiosInstance } from "../utils/axios"
import { AuthContext } from "../context/AuthUser";
import toast from "react-hot-toast";

export const useAuth=()=>{
    const {authUser,setAuthUser}=useContext(AuthContext);

    const getUser=async()=>{
        const {data}=await axiosInstance.get("/auth/");
        if(data.success){
            setAuthUser(data.user);
        }
    }


    const signUp=async(userData)=>{
        const {data}=await axiosInstance.post("/auth/signup",userData);
        if(data.success){
            console.log(data.user);
            setAuthUser(data.user)
        }
    }

    const login=async(userData)=>{
        try {
            const {data}=await axiosInstance.post("/auth/login",userData);
            if(data.success){
                console.log(data.user);
                toast.success("Logged in successfully");
                setAuthUser(data.user)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        
    }

    const logout=async()=>{
        try {
            const {data}=await axiosInstance.get("/auth/logout");
            if(data.success){
                setAuthUser(null);
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    return {getUser,signUp,login,logout}
}