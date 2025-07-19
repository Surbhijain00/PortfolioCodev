
import { NextResponse } from "next/server";
import connectToDB from "@/lib/dbConnect";
import { User } from "../../../models/user.model";
import { getUserFromToken } from "@/lib/auth";
import { Platform } from "@/models/platform.model";
import { Project } from "@/models/project.model";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find().select("-password");
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error(err.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectToDB();
    const user = await getUserFromToken();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();

    const skills = formData.get("skills");
    const skillsArray = skills.split(",").map((skill) => skill.trim()).filter((skill) => skill.length > 0);

    const updateFields = {
      username: formData.get("username"),
      about: formData.get("about"),
      location: formData.get("location"),
      portfolio: formData.get("portfolio"),
      linkedIn: formData.get("linkedIn"),
      github: formData.get("github"),
      skills: skillsArray,
    };

    const photoFile = formData.get("profilePhoto");
    if (photoFile && typeof photoFile === "object" && photoFile.size > 0) {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${photoFile.type};base64,${base64}`;

      const photoUpload = await cloudinary.uploader.upload(dataUri, {
        folder: "codev/users/photos",
      });
      updateFields.profilePhoto = photoUpload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updateFields, {
      new: true,
    });

    return NextResponse.json({updatedUser, message: 'Profile Updated Successfully'}, { status: 200 });
    
  } catch (err) {
    console.error(err.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await connectToDB();

    const user = await getUserFromToken();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await Platform.deleteMany({ user: user._id });
    await Project.deleteMany({ user: user._id });
    await User.findByIdAndDelete(user._id);

    const res = NextResponse.json(
      { message: "Account deleted permanently" },
      { status: 200 }
    );

    res.cookies.set("codev_token", "", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });

    return res;
  } catch (err) {
    console.error(err.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
