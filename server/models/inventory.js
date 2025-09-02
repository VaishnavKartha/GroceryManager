import mongoose from 'mongoose'

const inventorySchema=mongoose.Schema({
    itemName:{type:String,required:true},
    cost:{type:Number},
    image:{type:String,default:""},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"}
},{timestamps:true})

export const Inventory=mongoose.model("Inventory",inventorySchema)