import mongoose from 'mongoose'


const UserSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileLink:{type:String}
},{timestamps:true})

export const User=mongoose.model("User",UserSchema);