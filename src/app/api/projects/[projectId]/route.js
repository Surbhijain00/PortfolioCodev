
import { getUserFromToken } from "@/lib/auth";
import connectToDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { Project } from "../../../../models/project.model";

export async function DELETE(req, { params }) {
    try {
        await connectToDB();
        const user = await getUserFromToken();
        if(!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const { projectId } = await params;
        if(!projectId) return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });

        const project = await Project.findByIdAndDelete(projectId);
        if (!project) return NextResponse.json({ message: 'Project not found' }, { status: 404 });

        user.projects.pull(projectId);
        await user.save();

        return NextResponse.json({ message: `${project.title} deleted successfully`, project }, { status: 200 });

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
