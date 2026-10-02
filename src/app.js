const express = require("express");
const User = require("./models/user.model.js")

const app = express();

app.use(express.json());


app.post("/signUp", async (req, res) => {
    try {
        const data = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            emailId: data.emailId
        });

        if (existingUser) {
            return res.status(409).send("User already exists");
        }

        // Create a new User document
        const user = new User(data);

        // Save user to MongoDB
        await user.save();

        res.status(201).send(user);

    } catch (err) {
        res.status(400).send("Error saving user: " + err.message);
    }
});


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
        const user = await User.findOneAndDelete(emailId)
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

    const skills = data?.skills;
    if(skills.length > 10){
        throw new Error("You can add a maximum of 10 skills.")
    }
    
    const allowedUpdates = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
        "password"
    ];

    const isUpdateAllowed = Object.keys(data).every(
        (k) => allowedUpdates.includes(k)
    )

    if(!isUpdateAllowed) {
        throw new Error("Update not allowed");
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            data,
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );
        if (!user) {
            res.status(404).send("user not found!")
        } else {
            res.send("user updated successfully")
        }

    } catch (err) {
        res.status(500).send("Update Failed: ", err.message)

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