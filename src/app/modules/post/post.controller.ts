import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { PostService } from './post.service'

const createPost = catchAsync(async (req, res) => {
  const result = await PostService.createPostIntoDB(req.body)
  sendResponse(res, {
    success: true,
    message: 'post has been created successfully!',
    statusCode: 200,
    data: result,
  })
})

const getUserPost = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await PostService.getUserSinglePost(id)
  sendResponse(res, {
    success: true,
    message: 'post has been retrieved successfully!',
    statusCode: 200,
    data: result,
  })
})

export const PostController = {
  createPost,
  getUserPost,
}
