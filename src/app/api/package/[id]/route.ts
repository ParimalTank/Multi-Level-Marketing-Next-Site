import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";
import Package from "@/models/Package";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import PackageHistory from "@/models/PackageHistory";

export async function GET(request: Request, { params }) {  // get the id from params
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

export async function POST(request: Request, { params }) {  // get the id from params
    await MongoConnection();

    // Get Token From the Header
    const accessToken = request.headers.get("cookie")?.substring(6);

    // Decode the Token from the token
    const decoded = jwt.verify(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
    const userId = decoded.id;

    // This is Package Id
    const id = params.id;

    try {
        // Find the Package If Exist
        const result = await Package.findById({ _id: id });

        if (result) {
            const packagePrice = result.price;

            // Find the User current Balance 
            const user = await User.findOne({ _id: userId });

            // Balance is Always grater then 0
            if (user.userWallet > 0) {

                const updatedWallet = user.userWallet - packagePrice;
                // Updated Wallet balance is >= 0
                if (updatedWallet >= 0) {

                    await User.findByIdAndUpdate({ _id: userId }, { userWallet: updatedWallet });

                    // Save the Package History
                    const SavePackageHistory = {
                        packageId: id,
                        packagePrice: result.price,
                        userId: userId,
                        levels: result?.levels,
                        referralcode: user.referralcode,
                        numberofUsers: []
                    }

                    const packageHis = await PackageHistory.create(SavePackageHistory);

                    return NextResponse.json({ result: result }, { status: 200 });
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