import { Router } from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { PaymentRoute } from '../modules/payment/payment.route'

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
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export const routes = router
