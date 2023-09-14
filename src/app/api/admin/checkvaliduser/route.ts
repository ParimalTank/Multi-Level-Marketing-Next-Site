import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import PackageHistory from "@/models/PackageHistory";
import MongoConnection from "@/utils/MongoConnection";
import Admin from "@/models/Admin/Admin";

export async function POST(request: Request) {

    await MongoConnection();
    const accessToken = await request.json();
    const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

    try {
        // Decode the Token from the token
        const decoded: any = jwt.verify(accessToken.token, secret);
        const userId = decoded.id; // Get User Id From the Params

        const user = await Admin.findOne({ _id: userId });

        return NextResponse.json({ result: user }, { status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 409 })
    }
}