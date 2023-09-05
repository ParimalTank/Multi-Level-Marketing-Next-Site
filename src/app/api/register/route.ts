
import PackageHistory from "@/models/PackageHistory";
import User from "@/models/User";
import { sendMail } from "@/utils/MailSender";
import MongoConnection from "@/utils/MongoConnection";
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

        const email = await User.exists({ email: userData.email });

        if (email) {
            return NextResponse.json({ message: "User is Already Exist" }, { status: 409 })
        } else {

            const checkReferralCode = await User.findOne({ referralcode: userData.referralcode });

            const packageReferaal = await PackageHistory.findOne({ referralcode: userData.referralcode })
            console.log("packageReferaal: ", packageReferaal);

            if (packageReferaal) {

                if (packageReferaal.numberofUsers.length < packageReferaal.levels) {

                    if (checkReferralCode) {
                        const generateHash = await bcrypt.hash(userData.password, 10);
                        let userReferralCode = (Math.random() + 1).toString(36).substring(6);

                        const user = {
                            firstname: userData.firstname,
                            lastname: userData.lastname,
                            email: userData.email,
                            password: generateHash,
                            referralcode: userReferralCode,
                            referralFrom: userData.referralcode,
                            verificationCode: otp
                        }

                        const result = await User.create(user);

                        // await sendMail(
                        //     "Mail Verification",
                        //     JSON.stringify(userData.email),
                        //     `Verify Code :  ${otp}`
                        // );

                        return NextResponse.json({ result }, { status: 200 })
                    } else {
                        return NextResponse.json({ status: 410 })
                    }
                } else {
                    return NextResponse.json({ status: 409 });
                }
            }
        }
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({ message: "Fails" }, { status: 500 })
    }
}