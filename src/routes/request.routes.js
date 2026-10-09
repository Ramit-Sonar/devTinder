const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware.js");

const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    res.send(req.user.firstName + " sending a connection request");
})


module.exports = requestRouter;