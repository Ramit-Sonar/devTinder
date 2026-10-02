const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
            maxLength: 50,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
            maxLength: 50,
        },

        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
            select: false,
        },

        age: {
            type: Number,
            min: [18, "Age must be at least 18"],
            max: 100,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            validate(value) {
                if (!["male", "female", "other"].includes(value)) {
                    throw new Error("Gender is not a valid")
                }
            }
        },

        photoUrl: {
            type: String,
            default:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIn4fjDd1YPwl2P1Vv56dF3tMkFuGQugtwDchshGs0Wg&s",
        },

        about: {
            type: String,
            trim: true,
            maxLength: 500,
        },

        skills: {
            type: [String],
            default: [],
            validate: {
                validator: function (skills) {
                    return skills.length <= 10;
                },
                message: "You can add a maximum of 10 skills"
            }
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

