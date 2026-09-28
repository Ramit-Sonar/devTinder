require("dotenv").config();

const { adminAuth, userAuth } = require("./middlewares/auth.js")

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

//Handle Auth Middleware for all GET, POST, ... requests 

app.use("/admin", adminAuth )

app.get("/admin/getAllData", (req, res) => {
    res.send("get all data");
})

app.get("/admin/deleteAllData", (req, res) => {
    res.send("All Data Deleted");
})

app.get("/user", userAuth, (req, res) => {
    res.send("user is found")
})

app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}`);
})//listen for the incoming request 