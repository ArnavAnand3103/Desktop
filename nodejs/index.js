const express=require('express');
const { connectMongoDb } = require("./controller/connection");


const mongoose=require('mongoose');
const userRouter=require("./routes/user");
const {logReqRes}=require("./middlewares")


const users=require("./MOCK_DATA.json");
const { type } = require('os');
 
const app=express();
const PORT=8000;
//Connection
mongoose

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error:", err));






app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));
// app.use((req,res,next)=>{});
app.use("/api/users",userRouter);
console.log("Test running");



app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`))