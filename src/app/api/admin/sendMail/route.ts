import Admin from "@/models/Admin/Admin";
import { sendMail } from "@/utils/MailSender";
import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    await MongoConnection();

    // Random 6 digit OTP Generator
    let otp: any = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    try {

        const user = await request.json();

        const result = await Admin.findOneAndUpdate({ _id: user.userId }, { verificationCode: otp });

        if (!result) {
            return NextResponse.json({ status: 410 })
        }

        await sendMail(
            "Mail Verification",
            JSON.stringify(user.email),
            `Verify Code :  ${otp}`
        );

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 410 })
    }
}