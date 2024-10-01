import { Router } from 'express'
import { PaymentController } from './payment.controller'

const router = Router()

router.post('/verifyProfile', PaymentController.makePayment)

router.post('/confirmation', PaymentController.paymentConfirmation)

export const PaymentRoute = router
