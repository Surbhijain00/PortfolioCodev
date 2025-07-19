
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectToDB from './dbConnect';
import { User } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
}

export const verifytoken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

export const getUserFromToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('codev_token')?.value;

    if (!token) return null;
    try {
        await connectToDB();
        const decoded = verifytoken(token);
        const user = await User.findById(decoded.id).select('-password');
        return user;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}
