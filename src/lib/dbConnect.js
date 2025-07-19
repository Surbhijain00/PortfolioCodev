
import mongoose from "mongoose";

let isConnected = false;
const MONGO_URI = process.env.MONGO_URI;

export default async function connectToDB() {
    if(isConnected) return;
        
    try {
        await mongoose.connect(MONGO_URI);
        isConnected = true;
        console.log('Database Connected');
    } catch (err) {
        console.error(err.message);
    }
}
