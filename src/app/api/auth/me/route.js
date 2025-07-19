
import { getUserFromToken } from "@/lib/auth";
import connectToDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();
        const user = await getUserFromToken();
        if(!user) return NextResponse.json(null, { status: 200 });
        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ messagge: 'Internal Server Error' }, { status: 500 });
    }
}
