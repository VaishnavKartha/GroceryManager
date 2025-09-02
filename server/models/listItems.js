import mongoose from 'mongoose'



const ListItemsSchema=mongoose.Schema({
    listid:{type:mongoose.Schema.Types.ObjectId,ref:"UserList",required:true},
    contents:[
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true },
            quantity:{type:Number,default:1},
            purchased:{type:Boolean,default:false}
    }
    ]
},{timestamps:true})    

export const ListItems=mongoose.model("ListItems",ListItemsSchema)