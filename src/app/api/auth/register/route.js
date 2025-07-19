
import bcrypt from "bcryptjs";
import { User } from "../../../../models/user.model";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";
import connectToDB from "@/lib/dbConnect";

export async function POST(req) {
    try {
        await connectToDB();

        const { username, email, password, confirmPassword } = await req.json();
    
        if(!username ||  !email || !password || !confirmPassword) {
            return NextResponse.json({ message: 'All fields are required!' }, { status: 400 });
        }
        if(password.length < 6) {
            return NextResponse.json({ message: 'Password must be at least 6 characters!' }, { status: 400 });
        }
        if(password !== confirmPassword) {
            return NextResponse.json({ message: 'Passwords do not match!' }, { status: 400 });
        } 
    
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if(existingUser) return NextResponse.json({ message: 'User already exists!' }, { status: 400 });
        if(existingUsername) return NextResponse.json({ message: 'Username already taken!' }, { status: 400 });
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        });
        const token = generateToken(newUser._id.toString());
        const user = await User.findById(newUser._id).select('-password');
    
        const res = NextResponse.json({ message: 'New User registered successfully', user }, { status: 201 });
        
        res.cookies.set('codev_token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60,
            sameSite: 'strict',
        });
        
        return res;
        
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
