import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const App=express();
const server=http.createServer(App);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
        
})

io.on("connection",(socket)=>{
    console.log("someone connected",socket.id);

    io.on("disconnect",()=>{
        console.log("someone disconnected",socket.id);
    })
})


export {io,App,server}