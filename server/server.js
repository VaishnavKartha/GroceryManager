import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from './lib/dbConnect.js';
import {authRouter} from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import inventoryRouter from './routes/itemsRoutes.js';
import { App,server } from './lib/socket.js';
import { seed } from './utils/seed.js';
import listRouter from './routes/listRoutes.js';
import groupRouter from './routes/groupRoutes.js';

dotenv.config();

const PORT=process.env.PORT;
const __dirname=path.resolve();


App.use(express.json());
App.use(cookieParser());

App.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));



App.use("/api/auth",authRouter);
App.use('/api/inventory',inventoryRouter);
App.use("/api/list",listRouter);
App.use("/api/group/",groupRouter);

if(process.env.MODE==="production"){
    App.use(express.static(path.join(__dirname,"../client/dist")))
    App.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"))
    })
}

//seed()

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    connectDB();

})