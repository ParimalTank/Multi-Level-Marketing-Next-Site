import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import PackageHistory from "@/models/PackageHistory";

export async function POST(request: Request) {

    const accessToken = await request.json();

    try {
        const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
        // Decode the Token from the token
        const decoded: any = jwt.verify(accessToken.token, secret);
        const userId = decoded.id; // Get User Id From the Params

        const user = await User.findOne({ _id: userId });
        const PackageHis = await PackageHistory.find({ userId: userId });

        return NextResponse.json({ result: user, package: PackageHis }, { status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 200 })
    }
}