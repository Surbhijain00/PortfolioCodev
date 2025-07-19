
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const res = NextResponse.json({ message: "User logged out successfully" }, { status: 200 });
      
        res.cookies.set('codev_token', '', {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0),
        });

        return res;

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
