import Admin from "@/models/Admin/Admin";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {

    try {
        const userData = await request.json();

        // After Reset Password
        if (userData.token) {
            console.log("userData.token: From Admin Verification", userData.token);

            const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
            const decoded: any = jwt.verify(userData.token, secret);

            const userEmail = decoded.email;

            const user = await Admin.findOne({ email: userEmail });

            if (user) {
                if (Number(user.verificationCode) === Number(userData.otp)) {
                    return NextResponse.json({ status: 200 });
                } else {
                    return NextResponse.json({ message: "Invalid OTP" }, { status: 500 });
                }
            } else {
                return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
            }
        }

        // After Registration
        if (userData.id) {
            console.log("userData.id: ", userData.id);
            const user = await Admin.findOne({ _id: userData.id });

            if (user) {
                if (Number(user.verificationCode) === Number(userData.otp)) {

                    await Admin.findOneAndUpdate({ _id: userData.id }, { verify: true, isActive: true })

                    return NextResponse.json({ status: 200 });
                } else {
                    return NextResponse.json({ message: "Invalid OTP" }, { status: 500 });
                }
            } else {
                return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
            }
        }
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 500 });
    }
}