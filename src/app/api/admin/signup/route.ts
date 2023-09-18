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

        const userData = await request.json();
        console.log("userData: ", userData);

        const email = await Admin.exists({ email: userData.email });

        if (email) {
            return NextResponse.json({ message: "User is Already Exist" }, { status: 409 })
        } else {

            console.log("Email inside Sign up", email);

            const generateHash = await bcrypt.hash(userData.password, 10);

            const admin = {
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                password: generateHash,
                verificationCode: otp,
            }

            const result = await Admin.create(admin);

            // await sendMail(
            //     "Mail Verification",
            //     JSON.stringify(userData.email),
            //     `Verify Code :  ${otp}`
            // );

            return NextResponse.json({ result }, { status: 200 })
        }
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({ message: "Fails" }, { status: 500 })
    }
}