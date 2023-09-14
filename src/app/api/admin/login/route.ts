import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin/Admin";

export async function POST(request: Request) {
    await MongoConnection();

    try {
        const adminData = await request.json();

        const result = await Admin.findOne({ email: adminData.email });

        if (!result) {
            return NextResponse.json({ message: "Invalid User Credentials" }, { status: 409 })
        }

        const match = await bcrypt.compare(adminData.password, result.password);

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
                name: "admin_token",
                value: token,
                path: "/",
            });
            return response
        }
    } catch (err) {
        console.log("err: ", err);
        return NextResponse.json({ status: 500 })
    }
}
