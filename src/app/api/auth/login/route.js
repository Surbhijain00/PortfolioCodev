
import { NextResponse } from "next/server";
import { User } from "../../../../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import connectToDB from "@/lib/dbConnect";

export async function POST(req) {
    try {
        await connectToDB();
        const { email, password } = await req.json();

        if(!email || !password) return NextResponse.json({ message: 'All fields are required!' }, { status: 400 });
        
        const existingUser = await User.findOne({ email });
        if(!existingUser) return NextResponse.json({ message: 'Email or Password is incorrect!' }, { status: 400 });

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) return NextResponse.json({ message: 'Email or Password is incorrect!' }, { status: 400 });

        const token = generateToken(existingUser._id.toString());
        const user = await User.findById(existingUser._id).select('-password');

        const res = NextResponse.json({ message: 'User logged in successfully', user }, { status: 200 });
        
        res.cookies.set('codev_token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res;
        
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
