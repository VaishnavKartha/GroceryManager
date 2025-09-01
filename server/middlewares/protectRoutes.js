import jwt from 'jsonwebtoken'
import { User } from '../models/userSchema.js';

export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(400).json({success:false,message:"UnAuthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWTSECRET);

        if(!decoded){
            return res.status(400).json({message:"Invalid token"});
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        req.user=user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message});
    }

}