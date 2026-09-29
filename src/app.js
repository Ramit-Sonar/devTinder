const express = require("express");
const User = require("./models/user.js")

const app = express();

app.use(express.json());

app.post("/signUp", async (req, res) => {

    // Creating a new instance of the User model
    try {
        const user = new User(req.body)
        await user.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("Error saving the user data:", err);
    }

})

// GET user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.find({ emailId: userEmail })
        if (user.length === 0) {
            res.status(404).send("user not found")
        }
        res.send(user)
    } catch (err) {
        res.status(400).send("Something went wrong");
    }

})

//Feed API - HET/feed - ger all the users from the databasae
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

module.exports = { app }