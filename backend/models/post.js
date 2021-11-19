import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,

    },
    photo: {
      data: Buffer,
      contentType: String
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post