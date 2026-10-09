const express = require("express");
const User = require("../models/user.model.js");
const validateSignupData = require("../utils/validation.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
    try {
        const data = req.body;

        // Validate data
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

        // Hash password
        const passwordHash = await bcrypt.hash(data.password, 10);

        // Replace plain password with hashed password
        user.password = passwordHash;

        // Save user to MongoDB
        await user.save();

        res.status(201).send("Signup successful");

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Find user by email
        const user = await User.findOne({ emailId }).select("+password");

        if (!user) {
            return res.status(401).send("Invalid credentials!");
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

        return res.status(200).send("Login successful");

    } catch (err) {
        return res.status(500).send("Something went wrong");
    }
});

module.exports = authRouter;