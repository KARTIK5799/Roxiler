import express from "express";
import app from './src/app.js'

const port = process.env.PORT || 7000; 

app.use("/",(req,res)=>{
    res.send("hello")
})
app.listen(port,()=>{
    console.log(`Server Is Running On ${port}`);
})