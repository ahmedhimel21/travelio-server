import { Router } from 'express'
import { PostController } from './post.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../User/user.utils'

const router = Router()

router.post('/create', PostController.createPost)

router.post(
  '/upvote/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostController.upVotes,
)

router.post(
  '/downvote/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostController.downVotes,
)

router.get('/:id', PostController.getUserPost)

// get all post
router.get('/', PostController.getAllPost)

export const PostRoute = router
