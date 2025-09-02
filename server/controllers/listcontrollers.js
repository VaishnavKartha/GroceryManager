import { ListItems } from "../models/listItems.js";
import { UserList } from "../models/userList.js";


export const createList=async(req,res)=>{
    const {_id:userId}=req.user;
    const {listname}=req.body;
    try {

        if(!listname){
            return res.status(401).json({success:false,message:"Listname is required"})
        }
        const newList=new UserList({listname,userid:userId})
        await newList.save();

        if(!newList){
            return res.status(401).json({success:false,message:"List creation Failed"})
        }
        
        return res.status(201).json({success:true,message:"List Creation successfull"})
    } catch (error) {

        console.log(error.message);
        res.status(500).json({error:error.message});
        
    }


}

export const getLists=async(req,res)=>{
    try {
        const {_id:userId}=req.user;

        const lists=await UserList.find({userid:userId}).sort({ createdAt: -1 });
        
        //console.log(lists);
        return res.status(200).json({success:true,lists});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const getSelectedList=async(req,res)=>{
    const {listid}=req.params
    const {_id:userid}=req.user;
    console.log(listid)
    try {
        let itemsList=await ListItems.findOne({listid}).populate({
            path:"contents.item",
            model:"Inventory",
            select:"itemName cost image"
        });

        console.log(itemsList);

        if(!itemsList){
            itemsList=new ListItems({listid,contents:[]})
            await itemsList.save();
        }

        return res.status(200).json({success:true,itemsList});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }

}


export const saveList=async(req,res)=>{
    try {
        const {listid,contents}=req.body;
        console.log(listid,contents)
        if(!listid){
            return res.status(401).json({success:false,message:"Insufficient Data"});
        }

        const newList=await ListItems.findOneAndUpdate({listid},{$set:{contents}},{new:true}).populate({
            path:"contents.item",
            model:"Inventory",
            select:"itemName cost image"
        });

        if(!newList){
            return res.status(401).json({success:false,message:"Save Failed"});
        }

        return res.status(201).json({success:true,newList});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}