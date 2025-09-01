import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { User } from '../models/userSchema.js';
import { generateToken } from '../utils/generateToken.js';

export const signup=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username.trim()){
            return res.status(401).json({success:false,message:"username required"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(401).json({success:false,message:"Invalid email"});
        }

        if(!password || password.length<6){
            return res.status(401).json({sucess:false,message:"Invalid Password"});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(401).json({success:false,message:"User already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser= new User({username,email,password:hashedPassword})
        await newUser.save();

        

        if(newUser){
            generateToken(newUser._id,res);

            const { password, ...userWithoutPassword } = newUser.toObject();
            return res.status(201).json({success:true,user:userWithoutPassword});
        }

        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message})
        
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(401).json({success:false,message:"Invalid email"});
        }

        if(!password || password.length<6){
            return res.status(401).json({sucess:false,message:"Invalid Password"});
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({success:false,message:"User Not Found"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user?.password);
        if(!isPasswordCorrect){
            return res.status(401).json({success:false,message:"Incorrect Password"});
        }

        generateToken(user._id,res);
        
        return res.status(201).json({success:true,user})

    } catch (error) {
        
    }
}


export const getUser=async(req,res)=>{
    try {
        const user=req.user;
        if(user){
            return res.status(201).json({success:true,user})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message})
        
    }
}

export const logout=async(req,res)=>{
    try {
        const user=req.user;
        if(user){
            res.cookie("jwt","",{maxAge:0});
            res.status(201).json({success:true,message:"logged out Successfully"})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message})
    }
}


export const deleteUser=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}