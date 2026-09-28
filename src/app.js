require("dotenv").config();

const { adminAuth, userAuth } = require("./middlewares/auth.js")

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

//Handle Auth Middleware for all GET, POST, ... requests 

app.use("/admin", adminAuth)

app.get("/admin/getAllData", (req, res) => {
    res.send("get all data");
})

app.get("/admin/deleteAllData", (req, res) => {
    try {
        throw new Error("dsjfldskjfdskljdsfds")
        res.send("All Data Deleted");
    } catch (err) {
        res.status(500).send("something went wrong contact support team")
    }

})

app.get("/user", userAuth, (req, res) => {
    throw new Error("dsjfldskjfdskljdsfds")
    res.send("user is found")
})

//error handlers=> always write it toward the end 
app.use("/", (err, req, res, next) => {
    res.status(500).send("something went wrong")
}) // the best way to write code in try catch block

app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}`);
})//listen for the incoming request 