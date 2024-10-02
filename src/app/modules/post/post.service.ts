import { TPost } from './post.interface'
import { Post } from './post.model'

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}

const getUserSinglePost = async (id: string) => {
  const result = await Post.find({ author: id }).populate('author')
  return result
}

export const PostService = {
  createPostIntoDB,
  getUserSinglePost,
}
