import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Admin from "@/models/Admin/Admin";

export async function POST(request: Request) {

    try {
        await MongoConnection();

        const userData = await request.json();

        const user = await Admin.findOne({ email: userData.email });

        if (user) {
            const generateHash = await bcrypt.hash(userData.password, 10);

            await Admin.findOneAndUpdate({ email: userData.email }, { password: generateHash })

            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        }
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 500 });
    }
}