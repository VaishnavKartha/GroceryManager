import express from 'express'
import cors from 'cors'
import connectDB from './lib/dbConnect.js';
import {authRouter} from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
const PORT=process.env.PORT;
const App=express();
App.use(express.json());
App.use(cookieParser());

App.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));



App.use("/api/auth",authRouter);


App.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    connectDB();

})