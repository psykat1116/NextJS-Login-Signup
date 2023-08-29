import mongoose from "mongoose";

// Schema for the user
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: true,
        minLenght: [3, "Username must be at least 3 characters long!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLenght: [6, "Password must be at least 6 characters long!"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    }
});

// Create the model from the schema if does not exist or get it and export it
// mongoose.models.<model name> This is very much important to write in next js as we don't use express
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;