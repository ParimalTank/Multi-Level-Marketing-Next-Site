import { NextResponse } from "next/server";
import MongoConnection from "@/utils/MongoConnection";
import User from "@/models/User";

export async function GET(request: Request) {

    MongoConnection();
    try {
        const user = await User.find({});
        return NextResponse.json({ result: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 405 })
    }
}

export async function POST(request: Request) {

    try {
        const userData = await request.json();

        const statusChange = userData.status === "true" ? false : true;

        const status = await User.findOneAndUpdate({ _id: userData.id }, { isActive: statusChange })
        if (status) {
            console.log("Status Changed");
        }
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 405 })
    }
}