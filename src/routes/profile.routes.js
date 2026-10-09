const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware.js")
const { validateEditProfileData } = require("../utils/validation.js");

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

module.exports = profileRouter;