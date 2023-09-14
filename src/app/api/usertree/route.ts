import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function POST(request: Request) {

    const accessToken = await request.json();

    try {

        const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
        // Decode the Token from the token
        const decoded: any = jwt.verify(accessToken.token, secret);
        const userId = decoded.id; // Get User Id From the Params

        const user = await User.findOne({ _id: userId });

        const ReferralUser = await User.find({ referralFrom: user.referralcode })

        const username: any[] = [];

        ReferralUser.map((res) => {
            username.push({ firstname: res.firstname, lastname: res.lastname })
        })

        return NextResponse.json({ result: user, username: username }, { status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 200 })
    }
}