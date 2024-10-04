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

const getAllPost = catchAsync(async (req, res) => {
  const query = req.query
  const result = await PostService.getAllPost(query)
  sendResponse(res, {
    success: true,
    message: 'posts has been retrieved successfully!',
    statusCode: 200,
    data: result,
  })
})

const upVotes = catchAsync(async (req, res) => {
  const userId = req.user._id
  const postId = req.params.id
  const result = await PostService.upVotes(userId, postId)
  sendResponse(res, {
    success: true,
    message: 'You have made a up vote!',
    statusCode: 200,
    data: result,
  })
})

const downVotes = catchAsync(async (req, res) => {
  const userId = req.user._id
  const postId = req.params.id
  const result = await PostService.downVotes(userId, postId)
  sendResponse(res, {
    success: true,
    message: 'You have made a down vote!',
    statusCode: 200,
    data: result,
  })
})

export const PostController = {
  createPost,
  getUserPost,
  getAllPost,
  upVotes,
  downVotes,
}