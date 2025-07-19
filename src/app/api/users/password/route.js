
import bcrypt from "bcryptjs";
import { getUserFromToken } from "@/lib/auth";
import connectToDB from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        await connectToDB();
        const user = await getUserFromToken();
        if(!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { oldPassword, newPassword, confirmPassword } = await req.json();

        if(!oldPassword || !newPassword || !confirmPassword) {
            return NextResponse.json({ message: 'All fields are required!' }, { status: 400 });
        }

        if(newPassword.length < 6) {
            return NextResponse.json({ message: 'Password must be at least 6 characters!' }, { status: 400 });
        }

        if(newPassword !== confirmPassword) {
            return NextResponse.json({ message: 'Passwords do not match!' }, { status: 400 });
        }

        if(oldPassword === newPassword) {
            return NextResponse.json({ message: 'New password cannot be same as the old password!' }, { status: 400 });
        }

        const currentUser = await User.findById(user._id);
        const isMatch = await bcrypt.compare(oldPassword, currentUser.password);
        if(!isMatch) return NextResponse.json({ message: 'Old Password is incorrect!' }, { status: 400 });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(currentUser._id, {password : hashedPassword});

        const res = NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
        
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
