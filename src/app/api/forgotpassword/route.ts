
import User from "@/app/models/User";
import { sendMail } from "@/app/utils/MailSender";
import MongoConnection from "@/app/utils/MongoConnection";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    await MongoConnection();

    // Random 6 digit OTP Generator
    let otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    try {

        const userData = await request.json();
        console.log("userData: ", userData);

        const user = await User.findOne({ email: userData.email });
        console.log("user: ", user);

        if (user) {

            // await sendMail(
            //     "Mail Verification",
            //     JSON.stringify(userData.email),
            //     `Verify Code :  ${otp}`
            // );
            await User.findOneAndUpdate({ email: userData.email }, { verificationCode: otp })
            return NextResponse.json({ id: user._id }, { status: 200 })

        } else {
            return NextResponse.json({ message: "Invalid Email Id" }, { status: 409 })
        }
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({ message: "Fails" }, { status: 500 })
    }
}