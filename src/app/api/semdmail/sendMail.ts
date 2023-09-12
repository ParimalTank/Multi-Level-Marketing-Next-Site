import User from "@/models/User";
import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";



export async function POST(request: Request) {

    await MongoConnection();

    // Random 6 digit OTP Generator
    let otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    try {

        const user = await request.json();
        console.log("user: ", user);

        const result = await User.findOneAndUpdate({ _id: user.id }, { verificationCode: otp });

        if (!result) {

        }

        // await sendMail(
        //     "Mail Verification",
        //     JSON.stringify(userData.email),
        //     `Verify Code :  ${otp}`
        // );

        NextResponse.json({ status: 200 });

    } catch (error) {
        console.log("error: ", error);
        NextResponse.json({ status: 410 })
    }
}