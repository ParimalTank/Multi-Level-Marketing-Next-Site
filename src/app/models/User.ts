import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    referralcode: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    isActive: {
        type: String,
        default: false
    },
    userWallet: {
        type: Number,
        default: 750
    }
},
    {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.models.User || mongoose.model("User", userSchema);