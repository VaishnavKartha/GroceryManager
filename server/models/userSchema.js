import mongoose from 'mongoose'


const UserSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileLink:{type:String},
    groupid:[{type:mongoose.Schema.Types.ObjectId,ref:"Group"}]
},{timestamps:true})

export const User=mongoose.model("User",UserSchema);