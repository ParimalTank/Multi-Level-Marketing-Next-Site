import mongoose from "mongoose"

const MongoConnection = async () => {
    const url: any = process.env.MONGO_URI;
    await mongoose.connect(url).then((res) => {
        console.log("Mongodb connection successfully");
    }).catch((err) => {
        console.log("Mongodb connection error");
    })
}

export default MongoConnection
