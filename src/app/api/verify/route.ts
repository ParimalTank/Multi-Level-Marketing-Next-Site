import PackageHistory from "@/models/PackageHistory";
import User from "@/models/User";
import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const userData = await request.json();

        // After Reset Password
        if (userData.email) {
            console.log("condition userData.email: ", userData.email);

            const user = await User.findOne({ email: userData.email });

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
            const user = await User.findOne({ _id: userData.id });

            if (user) {
                if (Number(user.verificationCode) === Number(userData.otp)) {

                    await User.findOneAndUpdate({ _id: userData.id }, { verify: true, isActive: true })

                    // New User comes from the referral and add that user to this purchase package
                    const findPackage = await PackageHistory.findOne({ referralcode: user.referralFrom });

                    // Add new User into a Package
                    const referralUser = [...findPackage.numberofUsers, user.email];

                    await PackageHistory.findOneAndUpdate({ referralcode: user.referralFrom }, { numberofUsers: referralUser });

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