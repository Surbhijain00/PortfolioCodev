
import connectToDB from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
import { Platform } from "@/models/platform.model";
import { Project } from "@/models/project.model";

export async function GET(req, { params }) {
    try {
        await connectToDB();
        const { username } = await params;
        const user = await User.findOne({ username }).select('-password').populate('platforms projects');
        return NextResponse.json(user, { status: 200 });

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
