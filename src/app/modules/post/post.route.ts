import { Router } from 'express'
import { PostController } from './post.controller'

const router = Router()

router.post('/create', PostController.createPost)

router.get('/:id', PostController.getUserPost)

export const PostRoute = router
