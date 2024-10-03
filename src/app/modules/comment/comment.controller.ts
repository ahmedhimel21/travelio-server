import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { CommentService } from './comment.service'

const createComment = catchAsync(async (req, res) => {
  const { content, postId } = req.body
  const userId = req.user._id
  const commentData = {
    content,
    author: userId,
    postId,
  }
  const result = await CommentService.createComment(commentData)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Comment added successfully!',
    data: result,
  })
})

export const CommentController = {
  createComment,
}
