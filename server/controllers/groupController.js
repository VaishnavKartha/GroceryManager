import { model } from "mongoose";
import { Group } from "../models/groups.js";
import { User } from "../models/userSchema.js";

const addGroupIdToUser=async(activeUser,groupid)=>{
    try {
        
        const updatedUser= await User.findByIdAndUpdate(activeUser._id,{$addToSet:{groupid}},{new:true});   // in frontend after this call getUser()
     
        if(updatedUser){
         return true
        }
        return false
    } catch (error) {
        console.error("Error in addGroupIdToUser:", error.message);
        return false;
    }

}

export const createGroup=async(req,res)=>{
    try {
        const {groupName:name}=req.body;
        const user=req.user;

        if(!name.trim()){
            return res.status(401).json({success:false,message:"Group name is required"});
        }
        const groupData= new Group({name,users:[user?._id]})
        const savedGroup=await groupData.save();

        if(!savedGroup){
            return res.status(401).json({success:false,message:"Failed to Create Group"})
        }

        const isUserUpdated=await addGroupIdToUser(user,savedGroup?._id)

        if(isUserUpdated){
            return res.status(201).json({success:true,savedGroup});
        }
        return res.status(401).json({success:false,message:"Some error Occured,could not update user"});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const getUsers=async(req,res)=>{
    try {
        const user=req.user;
        if(!user)return res.status(400).json({message:"Unauthorized"});

        const allUsers=await User.find().select("-password");

        return res.status(200).json({success:true,users:allUsers.length>0?allUsers:[]})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const addUser=async(req,res)=>{
    try {
        const adminUser=req.user;
        const {users:participants}=req.body;
        const {groupid}=req.params;

        if(!adminUser)return res.status(400).json({message:"Unauthorized"});

        if(participants.length===0)return res.status(400).json({success:false,message:"Please select a person to add"});

        const updatedGroup=await Group.findByIdAndUpdate(groupid,{$addToSet:{users:{ $each:participants}}},{new:true}).populate({path:"users",model:"User",select:"username groupid"});

        if(!updatedGroup)return res.status(401).json({success:false,message:"Group Not Found"});

         let failedUpdates = [];
        for (const participantId of participants) {
            const isUpdated = await addGroupIdToUser({ _id: participantId }, groupid);
            if (!isUpdated) {
                failedUpdates.push(participantId);
            }
        }

        // 3. Send response based on update status
        if (failedUpdates.length > 0) {
            return res.status(207).json({
                success: true,
                message: `Group updated, but failed to update ${failedUpdates.length} participants`,
                group: updatedGroup
            });
        }

        return res.status(201).json({
            success: true,
            message: "Users added successfully",
            group: updatedGroup
        });




        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const getGroups=async(req,res)=>{
    try {
        const user=req.user;

        if(!user) return res.status(400).json({message:"Unauthorized"});

        const userData=await User.findById(user._id).select("groupid").populate({path:"groupid",model:"Group",select:"name list",populate:{path:"list" ,model:"UserList"}});
        return res.status(200).json({success:true,userGroups:userData?userData:{}})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const getGroupDetails=async(req,res)=>{
    try {
        const {groupid}=req.params;
        const user=req.user;
        if(!groupid || !user)return res.status(401).json({message:"Invalid Request"})
        const groupLists=await Group.findById(groupid).populate({path:"list",model:"UserList"})
                                                      .populate({ path: "users", model: "User", select: "username email" });
        console.log(groupLists)
        return res.status(200).json({success:true,groupLists:groupLists?groupLists:{}});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const leaveGroup=async(req,res)=>{
    try {
        const user=req.user;
        const {groupid}=req.params;
        if(!user)return res.status(400).json({success:false,message:"Not Authenticated"});

        const group=await Group.findById(groupid);
        if(!group)return res.status(400).json({success:false,message:"Group Not Found"});

        if(!group?.users?.includes(user._id))return res.status(400).json({success:false,message:"You are not a member of this group"});

        const updatedGroup=await Group.findByIdAndUpdate(groupid,{$pull:{users:user._id}})

        const updatedUser=await User.findByIdAndUpdate(user._id,{$pull:{groupid}});
        if(!updatedUser || !updatedGroup)return res.status(400).json({success:false,message:"some error occured"});

        return res.status(200).json({success:true,message:"You Left the Group"});


    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const deleteGroup=async(req,res)=>{
    try {
        const user=req.user;
        const {groupid}=req.params;
        if(!user)return res.status(400).json({success:false,message:"Not Authenticated"});

        const group=await Group.findById(groupid);
        if(!group)return res.status(400).json({success:false,message:"Group Not Found"});

        await Group.findByIdAndDelete(groupid);

        await User.findByIdAndUpdate(user._id,{$pull:{groupid}});

        return res.status(200).json({success:true,message:"Group Deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}