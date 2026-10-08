const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const userAuth = async (req, res, next) => {
    try {
        // Read token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Authentication required");
        }

        // Verify JWT
        const decode = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );

        // Find user from decoded _id
        const user = await User.findById(decode._id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Store authenticated user in request
        req.user = user;

        // Continue to next middleware/controller
        next();

    } catch (err) {
        return res.status(401).send("Invalid or expired token");
    }
};

module.exports = {
    userAuth
};