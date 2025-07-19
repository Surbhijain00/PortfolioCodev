
import { NextResponse } from "next/server";
import connectToDB from "@/lib/dbConnect";
import { Project } from "../../../models/project.model";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
    try {
        await connectToDB();
        const user = await getUserFromToken();
        if(!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const projects = await Project.find({ user: user._id }).sort({ createdAt : -1 });
        
        return NextResponse.json(projects, { status: 200 });

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

        const { title, description, link, technologies } = await req.json();
        if(!title || !description || !link || !technologies) {
            return NextResponse.json({ message: 'All fields are required!' }, { status: 400 });
        }
        
        const techArray = technologies.split(",").map((tech) => tech.trim()).filter((tech) => tech.length > 0);

        const addedProject = await Project.create({
            user: user._id,
            title,
            description,
            link,
            technologies: techArray
        });

        user.projects.push(addedProject._id);
        await user.save();

        return NextResponse.json({addedProject, message: `${addedProject.title} Added Successfully`}, { status: 201 });

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
