const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware.js")
const { validateEditProfileData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/edits", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            return res.status(401).send("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((field) => {
            loggedInUser[field] = req.body[field];
        })

        await loggedInUser.save();

        res.status(200).json({
            message: `${loggedInUser.firstName}, your Profile updated successfully`,
            data: loggedInUser
        });

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }


})

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { existingPassword, newPassword } = req.body;

        const loggedInUser = req.user;

        const isPasswordValid = await loggedInUser.validatePassword(existingPassword);

        if (!isPasswordValid) {
            return res.status(401).send("Incorrect existing password!");
        }

        loggedInUser.validateNewPassword(newPassword);

        loggedInUser.password = await bcrypt.hash(newPassword, 10);

        await loggedInUser.save();

        res.status(200).send("Password changed successfully");

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;