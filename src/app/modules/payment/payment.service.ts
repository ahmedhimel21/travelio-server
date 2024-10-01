/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { join } from 'path'
import ejs from 'ejs'
import verifyPayment from './payment.utils'
import { User } from '../User/user.model'
import mongoose from 'mongoose'
import { Post } from '../post/post.model'

const makePayment = async (payload: any) => {
  const { data } = await axios.post(
    'https://sandbox.aamarpay.com/jsonpost.php',
    payload,
  )
  return data
}

const paymentConfirmation = async (
  transactionId: string,
  status: string,
  _id: string,
) => {
  const totalUpvotes = await Post.aggregate([
    { $match: { author: new mongoose.Types.ObjectId(_id) } }, // Matching posts by author
    { $group: { _id: '$author', totalUpvotes: { $sum: '$upVotes' } } }, // Summing the upVotes field
  ])
  const verifyResponse = await verifyPayment(transactionId)
  if (
    verifyResponse &&
    verifyResponse.pay_status === 'Successful' &&
    totalUpvotes.length > 0
  ) {
    await User.findByIdAndUpdate(
      { _id },
      {
        verified: true,
      },
    )
    const successFilePath = join(__dirname, '../../../../public/success.ejs')
    const successTemplate = await ejs.renderFile(successFilePath, {
      status,
      transactionId,
      message: 'Your profile verified successfully!',
    })
    return successTemplate
  }
  if (!verifyResponse.pay_status) {
    const failedFilePath = join(__dirname, '../../../../public/failed.ejs')
    const failedTemplate = await ejs.renderFile(failedFilePath, {
      status,
      transactionId,
      message: 'Your payment failed. Please try again!',
    })
    return failedTemplate
  }
  if (totalUpvotes.length <= 0) {
    const upVoteFailedFilePath = join(
      __dirname,
      '../../../../public/upvoteFailed.ejs',
    )
    const upvoteVerificationFailedTemplate =
      ejs.renderFile(upVoteFailedFilePath)
    return upvoteVerificationFailedTemplate
  }
}

export const PaymentService = {
  makePayment,
  paymentConfirmation,
}
