import User from "../models/user.js";
import { validationResult } from "express-validator"
import expressJwt from 'express-jwt'

import userToken from "../userToken.js";



export const signup = async(req, res) => {
  const {name, email, password} = req.body

  try {
    const user = await new User({name, email, password})

    await user.save()
    res.json(user)
  } catch (error) {
    console.log(error)
  }
 
}

export const signin = async(req, res) => {
  const {email, password} = req.body

       
  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))) {
         res.json({
                id: user._id,
                name: user.name,
                email: user.email, 
                token: userToken(user._id)
         })
  } else {
         res.status(401)
         throw new Error('Invalid email or password')
  }
  
   
}

export const signout = (req, res) => {
  res.cookie('userToken', '')
  return res.json({message: 'Signout success'})
}   

export const requireSignin =  expressJwt({
  secret: `${process.env.JWT_SECRET}`,
  algorithms: ['HS256'],
  userProperty: 'auth'
})
  