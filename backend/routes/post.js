import express from 'express'
import {getPost, createPost, postsByUser, postById, isPoster, deletePost, updatePost} from '../controllers/post.js'
import { check } from 'express-validator'
import { requireSignin } from '../controllers/auth.js'

// import {createPostValidator} from '../validators/index.js' 

const router = express.Router()

router.get('/',  getPost)
router.get('/posts/by/:id', requireSignin, postsByUser)
router.post('/postcreate/new/:id', [
    check('title', 'Write a title').notEmpty(), 
    check('title', 'Title must be 4 between 4 to 150 characters ').isLength({
      min:4,
      max: 150
    }),
    // body
   check('body', 'Write a body').notEmpty(),
   check('title', 'body must be 4 between 4 to 2000 characters ').isLength({
      min:4,
      max: 2000
    })
], requireSignin, createPost)
router.delete('/post/:postId',requireSignin, isPoster, deletePost)
router.put('/post/:postId',requireSignin, isPoster, updatePost)
router.param('postById', postById )




export default router