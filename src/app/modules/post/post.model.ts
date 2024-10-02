import mongoose, { Schema } from 'mongoose'
import { TPost } from './post.interface'

const postSchema: Schema<TPost> = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    image: String,
    upVotes: { type: Number, default: 0 },
    premium: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

export const Post = mongoose.model<TPost>('Post', postSchema)
