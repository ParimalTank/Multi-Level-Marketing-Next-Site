import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Package from "@/models/Package";

export async function POST(request: Request) {
    await MongoConnection();

    try {
        const packageData = await request.json();

        // Pass token form the frontend and verify user is exist or not
        // get user id from the token(decode the token)
        // const result = await User.findOne({ email: userData.email });

        const packageDetails = {
            name: packageData.name,
            imageurl: packageData.imageurl,
            description: packageData.description,
            price: packageData.price,
            levels: packageData.levels
        }

        const result = await Package.create(packageDetails);

        return NextResponse.json({ message: "Package successfully created" }, { status: 200 });
    } catch (err) {
        console.log("err: ", err);
        return NextResponse.json({ status: 500 })
    }
}


export async function GET(request: Request) {
    await MongoConnection();

    try {
        // const packageData = await request.json();

        // Pass token form the frontend and verify user is exist or not
        // get user id from the token(decode the token)
        // const result = await User.findOne({ email: userData.email });

        const result = await Package.find({});
        return NextResponse.json({ result: result }, { status: 200 });
    } catch (err) {
        console.log("err: ", err);
        return NextResponse.json({ status: 500 })
    }
}

