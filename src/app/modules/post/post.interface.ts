import { Types } from 'mongoose'

export type TPost = {
  author: Types.ObjectId
  title: string
  content?: string
  category: string
  image?: string
  upVotes: number
  premium?: boolean
}
