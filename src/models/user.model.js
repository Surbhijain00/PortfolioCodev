
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "/user.jpg",
    },
    about: {
      type: String,
      default: "Hey I just joined Codev!",
    },
    location: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    skills: [
      {
        type: String,
        required: true,
      }
    ],
    platforms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Platform",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
