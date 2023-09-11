import mongoose, { model, models } from "mongoose";

const adminSchema = new mongoose.Schema({
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
},
    {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);