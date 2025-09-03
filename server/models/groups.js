import mongoose from 'mongoose'

const GroupSchema=mongoose.Schema({
    name:{type:String,required:true},
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    list:[{type:mongoose.Schema.Types.ObjectId,ref:"UserList"}]
},{timestamps:true})

export const Group=mongoose.model("Group",GroupSchema);