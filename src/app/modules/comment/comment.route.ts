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

// get comment by post id
router.get('/:id', CommentController.getCommentByPostId)

// update comment
router.put('/update/:commentId', CommentController.updateComment)

// delete comment
router.delete('/delete/:commentId/:postId', CommentController.deleteComment)

export const CommentRoute = router
