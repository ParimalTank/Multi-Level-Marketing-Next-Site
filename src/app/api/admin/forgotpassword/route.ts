import jwt from "jsonwebtoken";
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

        const user = await Admin.findOne({ email: adminData.email });

        const secrat: any = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id, email: user.email }, secrat, { expiresIn: 60 * 60 * 24 * 7 });
        if (user) {

            // await sendMail(
            //     "Mail Verification",
            //     JSON.stringify(adminData.email),
            //     `Verify Code :  ${otp}`
            // );

            await Admin.findOneAndUpdate({ email: adminData.email }, { verificationCode: otp })
            return NextResponse.json({ token: token }, { status: 200 })

        } else {
            return NextResponse.json({ message: "Invalid Email Id" }, { status: 409 })
        }
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({ message: "Fails" }, { status: 500 })
    }
}