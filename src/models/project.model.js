import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  technologies: [
    {
        type: String,
        required: true
    },
  ],
},
{
    timestamps: true
}
);

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);