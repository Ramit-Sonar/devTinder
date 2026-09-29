const express = require("express");
const User = require("./models/user.js")

const app = express();

app.post("/signUp", async (req, res) => {
    const userObj = {
        firstName: "Ramit",
        lastName: "Sonar",
        emailId: "ramit@gmail.com",
        password: "Dikshya@17"
    }
    //Creating a new instance of the User model
    try {
        const user = new User(userObj)
        await user.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("Error saving the user data:", err);

    }

})

module.exports = { app }