import express from 'express'
import cors from 'cors'
const PORT=process.env.PORT;
const App=express();
App.use(express.json());
App.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));


App.listen(()=>console.log(`Server running on port ${PORT}`))