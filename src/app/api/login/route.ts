import User from "@/app/models/User";
import MongoConnection from "@/app/utils/MongoConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    await MongoConnection();

    try {
        const userData = await request.json();

        const result = await User.findOne({ email: userData.email });
        console.log("result: ", result);

        if (!result) {
            return NextResponse.json({ message: "Invalide User Credantials" }, { status: 409 })
        }

        const match = await bcrypt.compare(userData.password, result.password);

        if (!match) {
            return NextResponse.json({ status: 409 })
        }
        console.log("result.isActive === false", result.isActive === "false");

        if (result.isActive === "false") {
            return NextResponse.json({ status: 410 })
        } else {
            return NextResponse.json({ status: 200 })
        }

        // const email = userData.email;
        // const userId = result._id;

        // await User.findOneAndUpdate({ email: userData.email }, { secret: secret.base32, verify: false });
        // return NextResponse.json({ data: { stringdata, email, userId } }, { status: 200 })

    } catch (err) {
        console.log("err: ", err);
        return NextResponse.json({ status: 500 })
    }
}