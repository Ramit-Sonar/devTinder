const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middleware.js");
const User = require("../models/user.model.js");
const Connection = require("../models/connectionRequest.model.js");

// Get all the pendign connection request for the loggedin user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Fetch incoming pending connection requests
        const incomingRequests = await Connection.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills");

        return res.status(200).json({
            message: "Incoming connection requests fetched successfully",
            count: incomingRequests.length,
            data: incomingRequests
        });

    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch incoming connection requests"
        });
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Find all accepted connections involving the logged-in user
        const connections = await Connection.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        })
            .populate("fromUserId", "firstName lastName photoUrl age gender about skills")
            .populate("toUserId", "firstName lastName photoUrl age gender about skills");

        // Extract the other user's profile from each connection
        const connectedUsers = connections.map((connection) => {
            return connection.fromUserId._id.toString() === loggedInUser._id.toString()
                ? connection.toUserId
                : connection.fromUserId;
        });

        return res.status(200).json({
            message: "Connections fetched successfully",
            count: connectedUsers.length,
            data: connectedUsers
        });

    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch connections"
        });
    }
});

module.exports = userRouter;