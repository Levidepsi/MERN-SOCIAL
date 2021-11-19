import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import { getPost } from '../controllers/post.js'
import userToken from '../userToken.js'

export const protect = async(req, res, next) => {
  let token

  if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded =  jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')
      next
    } catch (error) {
      console.log(error);
      res.status(401)
      throw new Error('Not Authorized, token failed')
    }
  }
}

// export const requireSignin = (req, res) => {
//     expressJwt({ 
//       secret: userToken,
//       algorithms: ['HS256']
//     })
      
    //   if (!req.user) {
    //   return res.status(401);
      
    // } else {
    //   return res.status(200)

    // }
// }



  // res.json(getPost)

