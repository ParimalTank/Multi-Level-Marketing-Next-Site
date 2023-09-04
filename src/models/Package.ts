import mongoose, { model, models } from "mongoose";

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    levels: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.models.Package || mongoose.model("Package", packageSchema);