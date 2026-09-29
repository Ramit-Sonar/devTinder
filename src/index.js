require("./preload.cjs");
require("dotenv").config();
const { connectDB } = require("./config/database.js");
const { app } = require("./app.js")
const mongoose = require("mongoose");


const PORT = process.env.PORT || 5000;

connectDB()
    .then(async() => {
        // Test MongoDB insert
        // await mongoose.connection.db.collection("users").insertOne({
        //     firstName: "Ramit",
        //     lastName: "Sonar"
        // });

        // console.log("Test user created");

        app.on("error", (error) => {
            console.log('EXPRESS SERVER ERROR:', error);
        });

        app.listen(PORT, () => {
            console.log(`server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log('MONGODB connection failed !!!', err);
    });

