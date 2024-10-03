import { Post } from '../post/post.model'
import { Comment } from './comment.model'

const createComment = async (payload: {
  content: string
  author: string
  postId: string
}) => {
  const comment = await Comment.create(payload)
  if (comment) {
    //   Add the comment to the post
    await Post.findByIdAndUpdate(payload?.postId, {
      $push: { comments: comment._id },
    })
  }
  return comment
}

export const CommentService = {
  createComment,
}
