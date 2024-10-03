import { Router } from 'express'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../User/user.utils'
import { CommentController } from './comment.controller'

const router = Router()

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.user),
  CommentController.createComment,
)

export const CommentRoute = router
