import mongoose from "mongoose";

const userListSchema=mongoose.Schema({
    listname:{type:String,required:true},
    status:{type:Boolean,default:false},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true})

export const UserList=mongoose.model("UserList",userListSchema)