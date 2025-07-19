
import { NextResponse } from "next/server";
import connectToDB from "@/lib/dbConnect";
import { getUserFromToken } from "@/lib/auth";
import { Platform } from "../../../models/platform.model";

export async function GET() {
    try {
        await connectToDB();
        const user = await getUserFromToken();
        if(!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const platforms = await Platform.find({ user: user._id }).sort({ createdAt : -1 });
        
        return NextResponse.json(platforms, { status: 200 });

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDB();
        const user = await getUserFromToken();
        if(!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { platform, username, highlights } = await req.json();
        if(!platform || !username || !highlights) {
            return NextResponse.json({ message: 'All fields are required!' }, { status: 400 });
        }
        
        const insertedPlatform = await Platform.create({
            user: user._id,
            username,
            platform,
            highlights,
        });

        user.platforms.push(insertedPlatform._id);
        await user.save();

        return NextResponse.json({insertedPlatform, message: `${insertedPlatform.platform} Added Successfully`}, { status: 201 });

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
