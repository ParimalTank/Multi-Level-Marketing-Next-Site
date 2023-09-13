import PackageHistory from "@/models/PackageHistory";
import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    MongoConnection();
    try {
        const user = await PackageHistory.find({});
        return NextResponse.json({ result: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 405 })
    }
}