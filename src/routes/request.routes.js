const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware.js");
const User = require("../models/user.model.js");
const Connection = require("../models/connectionRequest.model.js");

const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];

        // Validate the connection request status
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid connection request status"
            });
        }

        // Prevent users from sending connection requests to themselves
        if (fromUserId.toString() === toUserId) {
            return res.status(400).json({
                message: "You cannot send a connection request to yourself"
            });
        }

        // Check whether the recipient user exists
        const toUser = await User.findById(toUserId);

        if (!toUser) {
            return res.status(404).json({
                message: "Recipient user not found"
            });
        }

        // Prevent duplicate requests in either direction
        const existingConnectionRequest = await Connection.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(409).json({
                message: "A connection request already exists between these users"
            });
        }

        // Create and save the connection request
        await Connection.create({
            fromUserId,
            toUserId,
            status
        });

        return res.status(201).json({
            message: `Connection request sent to ${toUser.firstName} successfully`
        });

    } catch (err) {
        // Handle invalid MongoDB IDs and other unexpected errors
        if (err.name === "CastError") {
            return res.status(400).json({
                message: "Invalid recipient user ID"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = requestRouter;