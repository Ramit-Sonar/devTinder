const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
            unique: true,  // Creates a unique index on email to prevent duplicates and speed up searches.
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email address is not valid")
                }
            }
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
            select: false,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Password is weak")
                }
            }
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
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Photo URL is not valid");
                }
            }
        },

        about: {
            type: String,
            trim: true,
            maxLength: 500,
        },

        skills: {
            type: [String],
            default: [],
            validate(value) {
                if (value.length > 10) {
                    throw new Error("Doesnot allow more than 10 skills")
                }
            }
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWT = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
        }
    )
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    return await bcrypt.compare(
        passwordInputByUser,
        this.password
    );
}

userSchema.methods.validateNewPassword = function (password) {
    const passwordSchema = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordSchema.test(password)) {
        throw new Error("Password does not meet the requirements");
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

