const express = require("express");
const User = require("./models/user.model.js")
const validateSignupData = require("./utils/validation.js")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js")

const app = express();

app.use(express.json());
app.use(cookieParser())


app.post("/signUp", async (req, res) => {
    try {
        const data = req.body;

        //validate data
        validateSignupData(req);

        // Check if user already exists
        const existingUser = await User.findOne({
            emailId: data.emailId
        });

        if (existingUser) {
            return res.status(409).send("User already exists");
        }

        // Create a new User document
        const user = new User(data);

        // Hash Password
        const passwordHash = await user.hashPassword();

        // Replace plain password with hashed password
        data.password = passwordHash;

        // Save user to MongoDB
        await user.save();

        res.status(201).send(user);

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Find user by email
        const user = await User.findOne({ emailId }).select("+password");

        if (!user) {
            return res.status(401).send("Invalid credentials");
        }

        // Compare plain password with hashed password
        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(401).send("Invalid credentials");
        }

        // Create JWT
        const token = user.getJWT();

        // Store JWT in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).send("Login successful");

    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

app.get("/profile", userAuth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    res.send(req.user.firstName + " sending a connection request");
})


module.exports = { app }