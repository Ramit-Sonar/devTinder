const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Sender user ID is required"]
        },

        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Receiver user ID is required"]
        },

        status: {
            type: String,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: "{VALUE} is not a valid connection status"
            },
            required: [true, "Connection status is required"]
        }
    },
    {
        timestamps: true
    }
);

connectionSchema.index({ fromUserId: 1, toUserId: 1 })

module.exports = mongoose.model("Connection", connectionSchema)