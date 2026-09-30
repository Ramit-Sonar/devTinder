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

//GET  user by id
app.get("/getUser/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

//delete a user from the database
app.delete("/user/:id", async (req, res) => {
    userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.status(200).send("user deleted successfully", user)
    } catch (err) {
        res.status(500).res("something went wrong")
    }
})

app.delete("/user", async (req, res) => {
    emailId = req.body.emailId;
    try {
        const user = await User.findOneAndDelete( emailId)
        if (!user) {
            res.status(404).send("user not found")
        } else {
            res.status(200).send("user deleted successfully", user)
        }

    } catch (err) {
        res.status(500).res("something went wrong")
    }
})

//update data of the user
app.patch("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId,data,{returnDocument: "after"});
        res.send("user updated successfully")
        console.log(user);
        
    } catch (err) {
        res.status(500).res("something went wrong")

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