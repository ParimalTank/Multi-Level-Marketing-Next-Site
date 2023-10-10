import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";
import Package from "@/models/Package";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import PackageHistory from "@/models/PackageHistory";

export async function GET(request: Request, { params }: { params: any }) {  // get the id from params
    await MongoConnection();

    // Id from the Params
    const id = params.id;

    try {
        const result = await Package.findById({ _id: id });
        return NextResponse.json({ result: result }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}

export async function POST(request: Request, { params }: { params: any }) {  // get the id from params
    await MongoConnection();

    // Get Token From the Header
    const accessToken: any = request.headers.get("cookie")?.substring(6);
    const secrat: any = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
    // Decode the Token from the token
    const decoded: any = jwt.verify(accessToken, secrat);
    const userId = decoded.id; // Get User Id From the Params

    // This is Package Id
    const id = params.id;

    try {
        // Find the Package If Exist
        const result = await Package.findById({ _id: id });

        if (result) {

            const packagePrice = result.price;

            // Find the current Users Balance 
            const user = await User.findOne({ _id: userId });

            // Balance is Always grater then 0
            if (user.userWallet > 0) {
                // Package Perches
                const updatedWallet = user.userWallet - packagePrice;

                // Updated Wallet balance is >= 0
                if (updatedWallet >= 0) {

                    // Find Referral code From Package  userfrom referral code === referralcode
                    const findReferral = await PackageHistory.findOne({ referralcode: user.referralFrom });

                    let levels;

                    if (packagePrice === 50) {
                        levels = 1;

                    } else if (packagePrice === 100) {
                        levels = 5
                    } else if (packagePrice === 500) {
                        levels = 10
                    }

                    const totalLevel = user.levels + levels;

                    // If User is Not Buy a Referral user Package commission is not applying them
                    if (findReferral) {

                        // if (findReferral?.packagePrice === packagePrice) {

                        // Add Commission to referral user
                        const packageUser = await User.findOne({ _id: findReferral.userId });

                        let commission;

                        if (packagePrice === 50 || packagePrice === 100) {
                            // Wallet value + commission
                            commission = packageUser.userWallet + ((packagePrice * 5) / 100);
                        } else {
                            commission = packageUser.userWallet + ((packagePrice * 25) / 100);
                        }

                        // Update Wallet Value and their value
                        await User.findByIdAndUpdate({ _id: userId }, { userWallet: updatedWallet, levels: totalLevel });

                        // ADD Commission to referral user
                        await User.findByIdAndUpdate({ _id: findReferral.userId }, { userWallet: commission })

                        // Save the Package History
                        const SavePackageHistory = {
                            name: result.name,
                            packageId: id,
                            packagePrice: result.price,
                            userId: userId,
                            levels: result?.levels,
                            referralcode: user.referralcode,
                        }

                        const packageHis = await PackageHistory.create(SavePackageHistory);
                        return NextResponse.json({ result: result }, { status: 200 });

                        // } else {
                        //     // Save the Package History
                        //     const SavePackageHistory = {
                        //         name: result.name,
                        //         packageId: id,
                        //         packagePrice: result.price,
                        //         userId: userId,
                        //         levels: result?.levels,
                        //         referralcode: user.referralcode,
                        //         numberofUsers: []
                        //     }

                        //     await User.findByIdAndUpdate({ _id: userId }, { userWallet: updatedWallet, levels: totalLevel });
                        //     await PackageHistory.create(SavePackageHistory);
                        //     return NextResponse.json({ result: result }, { status: 200 });
                        // }
                    } else {

                        // Save the Package History
                        const SavePackageHistory = {
                            name: result.name,
                            packageId: id,
                            packagePrice: result.price,
                            userId: userId,
                            levels: result?.levels,
                            referralcode: user.referralcode,
                        }

                        await User.findByIdAndUpdate({ _id: userId }, { userWallet: updatedWallet, levels: totalLevel });
                        await PackageHistory.create(SavePackageHistory);
                        return NextResponse.json({ result: result }, { status: 200 });
                    }
                } else {
                    return NextResponse.json({ status: 409 });
                }
            } else {
                return NextResponse.json({ status: 409 });
            }
        } else {
            return NextResponse.json({ status: 500 })
        }
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}