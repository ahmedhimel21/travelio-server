import { Router } from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { PaymentRoute } from '../modules/payment/payment.route'
import { PostRoute } from '../modules/post/post.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoute,
  },
  {
    path: '/post',
    route: PostRoute,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export const routes = router
