import { Types } from 'mongoose'

interface Voter {
  user: Types.ObjectId
  vote: 'upvote' | 'downvote'
}

export type TPost = {
  author: Types.ObjectId
  title: string
  content?: string
  category: string
  image?: string
  upVotes: number
  downVotes: number
  voters: Voter[]
  premium?: boolean
}
