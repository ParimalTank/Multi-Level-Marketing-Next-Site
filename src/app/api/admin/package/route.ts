import Package from "@/models/Package";
import MongoConnection from "@/utils/MongoConnection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    MongoConnection();
    try {
        const user = await Package.find({});
        return NextResponse.json({ result: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 405 })
    }
}

export async function POST(request: Request) {

    MongoConnection();
    try {

        const packageData = await request.json();
        console.log("packageData: ", packageData);

        if (packageData) {

            const packageObject = {
                name: packageData.name,
                imageurl: packageData.imageurl,
                description: packageData.description,
                price: packageData.price,
                levels: packageData.levels
            }

            await Package.create(packageObject);

            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ status: 410 });
        }
    } catch (error) {
        return NextResponse.json({ status: 405 })
    }
}

export async function PATCH(request: Request) {

    MongoConnection();
    try {

        const PackageData = await request.json();
        const dataWithOutImage = PackageData.imageurl;

        if (!dataWithOutImage) {
            // Data without Image
            await Package.findOneAndUpdate({ _id: PackageData._id }, { name: PackageData.name, description: PackageData.description, price: PackageData.price, levels: PackageData.levels })
            return NextResponse.json({ status: 200 })
        } else {
            // Data WithImage
            await Package.findOneAndUpdate({ _id: PackageData._id }, { name: PackageData.name, imageurl: PackageData.imageurl, description: PackageData.description, price: PackageData.price, levels: PackageData.levels })
            return NextResponse.json({ status: 200 })
        }
    } catch (errr) {
        console.log("errr: ", errr);
        return NextResponse.json({ status: 410 })
    }
}

export async function DELETE(request: Request) {

    MongoConnection();
    try {
        const id = request.nextUrl.searchParams.get('id')
        await Package.findOneAndDelete({ _id: id });
        return NextResponse.json({ status: 200 })
    } catch (errr) {
        console.log("errr: ", errr);
        return NextResponse.json({ status: 410 })
    }

}