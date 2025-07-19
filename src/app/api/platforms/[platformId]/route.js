
import { getUserFromToken } from "@/lib/auth";
import connectToDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { Platform } from "../../../../models/platform.model";

export async function DELETE(req, { params }) {
    try {
        await connectToDB();
        const user = await getUserFromToken();
        if(!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { platformId } = await params;
        if(!platformId) return NextResponse.json({ message: 'Platform ID is required' }, { status: 400 });

        const platform = await Platform.findByIdAndDelete(platformId);

        if (!platform) return NextResponse.json({ message: 'Project not found' }, { status: 404 });

        user.platforms.pull(platformId);
        await user.save();

        return NextResponse.json({ message: `${platform.platform} removed successfully`, platform }, { status: 200 });

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
