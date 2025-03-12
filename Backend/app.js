//password= 267KnrH0FysJKJmS
//"mongodb+srv://admin:267KnrH0FysJKJmS@cluster0.taukt.mongodb.net/"

import express from "express"
import mongoose from "mongoose"
import userRoute from "./Route/UserRoute.js"
import bodyParser from "body-parser"

const app = express();
app.use(bodyParser.json());

let mongoUrl = "mongodb+srv://admin:267KnrH0FysJKJmS@cluster0.taukt.mongodb.net/";

mongoose.connect(mongoUrl);

const conn = mongoose.connection;

conn.once("open",()=>{
    console.log("Connection established")
})

app.use("/api/employees",userRoute);

app.listen(5000,()=>{
    console.log ("Server running on port 5000");
})
