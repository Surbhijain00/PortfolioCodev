
import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
},
{
    timestamps: true
}
);

export const Platform = mongoose.models.Platform || mongoose.model('Platform', platformSchema);
