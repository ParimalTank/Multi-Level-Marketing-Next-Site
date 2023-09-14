

import Admin from "@/models/Admin/Admin";
import { sendMail } from "@/utils/MailSender";
import MongoConnection from "@/utils/MongoConnection";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    await MongoConnection();

    // Random 6 digit OTP Generator
    let otp: any = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    try {

        const adminData = await request.json();
        console.log("adminData: ", adminData);

        const user = await Admin.findOne({ email: adminData.email });
        console.log("user: ", user);

        if (user) {

            // await sendMail(
            //     "Mail Verification",
            //     JSON.stringify(adminData.email),
            //     `Verify Code :  ${otp}`
            // );
            await Admin.findOneAndUpdate({ email: adminData.email }, { verificationCode: otp })
            return NextResponse.json({ email: adminData.email }, { status: 200 })

        } else {
            return NextResponse.json({ message: "Invalid Email Id" }, { status: 409 })
        }
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({ message: "Fails" }, { status: 500 })
    }
}