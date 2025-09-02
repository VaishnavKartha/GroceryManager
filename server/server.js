import express from 'express'
import cors from 'cors'
import connectDB from './lib/dbConnect.js';
import {authRouter} from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import inventoryRouter from './routes/itemsRoutes.js';
import { seed } from './utils/seed.js';
import listRouter from './routes/listRoutes.js';
const PORT=process.env.PORT;
const App=express();
App.use(express.json());
App.use(cookieParser());

App.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));



App.use("/api/auth",authRouter);
App.use('/api/inventory',inventoryRouter);
App.use("/api/list",listRouter)

//seed()

App.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    connectDB();

})