import catchAsync from '../../utility/catchAsync'
import crypto from 'crypto'
import { PaymentService } from './payment.service'
import sendResponse from '../../utility/sendResponse'

const makePayment = catchAsync(async (req, res) => {
  const transactionId = crypto.randomBytes(16).toString('hex')
  const modifiedPaymentObj = {
    cus_name: req.body.name,
    cus_email: req.body.email,
    cus_phone: '01846343410',
    amount: req.body.amount,
    tran_id: transactionId,
    signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
    store_id: 'aamarpaytest',
    currency: 'BDT',
    desc: 'Verified profile',
    cus_add1: 'N/A',
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_country: 'Bangladesh',
    success_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${transactionId}&userId=${req.body._id}&status=success`,
    fail_url: `http://localhost:5000/api/v1/payment/confirmation?status=failed`,
    cancel_url: `http://localhost:3000`,
    type: 'json',
  }
  const result = await PaymentService.makePayment(modifiedPaymentObj)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Payment recieved successfully',
    data: result,
  })
})

const paymentConfirmation = catchAsync(async (req, res) => {
  const result = await PaymentService.paymentConfirmation(
    req.query?.transactionId as string,
    req.query?.status as string,
    req.query?.userId as string,
  )
  res.send(result)
})

export const PaymentController = {
  makePayment,
  paymentConfirmation,
}
