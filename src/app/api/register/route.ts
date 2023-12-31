import PackageHistory from "@/models/PackageHistory";
import User from "@/models/User";
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

        const email = await User.exists({ email: userData.email });

        if (email) {
            return NextResponse.json({ message: "User is Already Exist" }, { status: 409 })
        } else {
            // Find user Referral Code  // This is from the User
            const checkReferralCode = await User.findOne({ referralcode: userData.referralcode });

            // Validate the referral code
            const packageReferaal = await PackageHistory.findOne({ referralcode: userData.referralcode })

            // const result = await PackageHistory.find({ referralcode: userData.referralcode })

            if (packageReferaal.levels > 0) {

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
                        verificationCode: otp,
                    }

                    const result = await User.create(user);
                    const levels = checkReferralCode.levels - 1;

                    if (levels > 0) {

                        // Decrease the Levels of User because this user refer to another user
                        await User.findOneAndUpdate({ referralcode: userData.referralcode }, { levels: levels });
                        await sendMail(
                            "Mail Verification",
                            JSON.stringify(userData.email),
                            `Verify Code :  ${otp}`
                        );
                        
                        return NextResponse.json({ result }, { status: 200 ,  
                            headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                            "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        } }  )

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