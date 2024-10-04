import httpStatus from 'http-status'
import AppError from '../../Error/AppError'
import { TPost } from './post.interface'
import { Post } from './post.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from '../../utility/searchFields'

// create post
const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}

// get specific user
const getUserSinglePost = async (id: string) => {
  const result = await Post.find({ author: id }).populate('author')
  return result
}

// get all post
const getAllPost = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find(), query)
    .search(searchableFields) // Specify the searchable fields
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await postQuery.modelQuery
    .populate('author')
    .populate('comments')
    .exec()

  // Get total post count and pagination details
  const { total, totalPage, page, limit } = await postQuery.countTotal()
  return {
    posts: result,
    totalPages: totalPage,
    currentPage: page,
    totalPosts: total,
    limit,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const upVotes = async (userId: any, postId: string) => {
  const post = await Post.findById(postId)
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!')
  }

  // Check if user has already voted
  const existingVote = post.voters.find(
    voter => String(voter.user) === String(userId),
  )

  if (existingVote) {
    if (existingVote.vote === 'upvote') {
      // User already upvoted, so remove the upvote
      post.upVotes -= 1
      post.voters = post.voters.filter(
        voter => String(voter.user) !== String(userId),
      )
    } else if (existingVote.vote === 'downvote') {
      // User had downvoted, so switch to upvote
      post.downVotes -= 1
      post.upVotes += 1
      existingVote.vote = 'upvote'
    }
  } else {
    // User has not voted, so add an upvote
    post.upVotes += 1
    post.voters.push({ user: userId, vote: 'upvote' })
  }

  const result = await post.save()
  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const downVotes = async (userId: any, postId: string) => {
  const post = await Post.findById(postId)

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!')
  }
  // Check if user has already voted
  const existingVote = post.voters.find(
    voter => String(voter.user) === String(userId),
  )

  if (existingVote) {
    if (existingVote.vote === 'downvote') {
      // User already downvoted, so remove the downvote
      post.downVotes -= 1
      post.voters = post.voters.filter(
        voter => String(voter.user) !== String(userId),
      )
    } else if (existingVote.vote === 'upvote') {
      // User had upvoted, so switch to downvote
      post.upVotes -= 1
      post.downVotes += 1
      existingVote.vote = 'downvote'
    }
  } else {
    // User has not voted, so add a downvote
    post.downVotes += 1
    post.voters.push({ user: userId, vote: 'downvote' })
  }

  const result = await post.save()
  return result
}

export const PostService = {
  createPostIntoDB,
  getUserSinglePost,
  getAllPost,
  upVotes,
  downVotes,
}
