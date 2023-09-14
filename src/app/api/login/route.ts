import User from "@/models/User";
import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    await MongoConnection();

    try {
        const userData = await request.json();
        console.log("userData: ", userData);

        const result = await User.findOne({ email: userData.email });
        console.log("result: ", result);

        if (!result) {
            return NextResponse.json({ message: "Invalid User Credentials" }, { status: 409 })
        }

        const match = await bcrypt.compare(userData.password, result.password);

        if (!match) {
            return NextResponse.json({ status: 409 })
        }

        if (result.isActive === "false") {
            return NextResponse.json({ status: 410 })
        } else {
            const secrat: any = process.env.JWT_SECRET;
            const token = jwt.sign({ id: result._id }, secrat, { expiresIn: 60 * 60 * 24 * 7 })

            const response = NextResponse.json({ status: 200 });

            response.cookies.set({
                name: "token",
                value: token,
                path: "/",
            });
            return response
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