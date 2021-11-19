import express from 'express'
// import { check } from 'express-validator'
import userSignupValidator  from '../validators/index.js'
import { signup, signin, signout  } from '../controllers/auth.js'



const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello')
})
router.get('/signout', userSignupValidator, signout )

router.post('/signup', signup)

router.post('/signin', signin )




export default router