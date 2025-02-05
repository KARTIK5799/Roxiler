import express from "express";
import app from './app.js'

const port = process.env.PORT || 7000; 


app.listen(port,()=>{
    console.log(`Server Is Running On ${port}`);
})