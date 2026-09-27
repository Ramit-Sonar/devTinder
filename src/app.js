const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/test",(req,res) => {
    res.send("Hello from the server!")
})//request handlers 
app.use("/hello",(req,res) => {
    res.send("Hello Hello Hello!")
})
app.use("/",(req,res) => {
    res.send("Hello From the Dashboard")
})

app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}`);
})//listen for the incoming request 