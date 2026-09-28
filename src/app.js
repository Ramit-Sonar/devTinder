require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

//here we check wheather admin is authorized or not but here one prblem same logic for checking authorized admin we need to write multiple time to solve this problem middle ware comes into the picture

app.get("/admin/getAllData", (req,res) => {
    //Logic of checking if the request is authorized
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized){
        res.send("All Data Sent");
    }else{
        res.status(401).send("Unauthorized request");
    }
})

app.get("/admin/deleteAllData", (req,res) => {
    //Logic of checking if the request is authorized
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized){
        res.send("All Data Deleted");
    }else{
        res.status(401).send("Unauthorized request");
    }
})

app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}`);
})//listen for the incoming request 