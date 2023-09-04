import mongoose, { model, models } from "mongoose";

const packageHistorySchema = new mongoose.Schema({

    packageId: {
        type: String,
        required: true
    },
    packagePrice: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    levels: {
        type: Number,
        required: true
    },
    referralcode: {
        type: String,
        required: true
    },
    numberofUsers: {
        type: [{
            type: String
        }],
    }
},
    {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.models.PackageHistory || mongoose.model("PackageHistory", packageHistorySchema);