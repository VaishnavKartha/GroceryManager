import { Category } from "../models/categories.js";
import { Inventory } from "../models/inventory.js";


export const getInventory=async(req,res)=>{
    try {
        const wholeInventory=await Inventory.find().populate({path:"category",model:"Category",select:"name"});

        if(wholeInventory.length===0){
            return res.status(400).json({success:false,message:"Inventory Empty"})
        }


        //console.log(wholeInventory);
        return res.status(200).json({success:true,wholeInventory})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}


export const getCategories=async(req,res)=>{
    try {
        const wholeCategory=await Category.find();
        if(wholeCategory.length>0){
            return res.status(200).json({success:true,categories:wholeCategory})
        }
        return res.status(400).json({success:false,message:"Category Empty"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const addNewItem=async(req,res)=>{
    try {
        
        const {itemName:name,cost,category}=req.body;
        const user=req.user;

        if(!user)return res.status(401).json({message:"Unauthorized"});
        if(!name || !cost || !category)return

        const itemNames=await Inventory.find().select("itemName");
        const isPresent=itemNames.some((item)=>item.itemName.replaceAll(/\s+/g, "").toLowerCase()===name.replaceAll(/\s+/g, "").toLowerCase())

        if(isPresent)return res.status(401).json({success:false,message:"Item already Present"});
        
        const newData=new Inventory({itemName:name,cost,category});
        await newData.save();
        if(!newData)return res.status(401).json({success:false,message:"Failed to add Item"});
        return res.status(201).json({success:true,message:"Item Added"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}


export const queryString=async(req,res)=>{
    try {
        const {category}=req.query
        
        if(!category || !category.trim()){
           return
        }

        const newInventory=await Inventory.find({category}).populate({path:"category",model:"Category",select:"name"})
        if(newInventory){
            //console.log(newInventory);
            return res.status(200).json({success:true,newInventory});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const searchString=async(req,res)=>{
    try {
        const {text}=req.query
        if(!text.trim())return

        const InventoryItems=await Inventory.find().populate({path:"category",model:"Category",select:"name"})
        if(InventoryItems){
            const items=InventoryItems.filter((item)=>item.itemName.toLowerCase().includes(text.toLowerCase()));
            
            return res.status(200).json({success:true,items:items.length>0?items:[]});
            

        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }

}