import User from "../models/user.js";

export const getUsers = async (req, res) => {
       
  const users = await User.find({})
    
    res.json(users)
}

export const getUserById = async (req, res) => {
  
  const user = await User.findById(req.params.id).select('-password')
  if(user) {
   res.json(user)
  } else {
         res.status(404)
         throw new Error('User not found')
  }
}

export const updateUser = async(req, res) => {
  const user = await User.findById(req.params.id)

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    const updateUser = await user.save()
    console.log(updateUser)
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    })
  }
}

export const deleteUser = async(req, res) => {
  const user = await User.findById(req.params.id)

  if(user) {
    await user.remove()
    res.json({message: 'User Removed'})
  } else {
    res.status(404)
    // throw new Error('User not found')
  }
 
}

export const hasAuthorization = (req, res, next) => {
  const authorized= req.profile && req.auth && req.profile._id === req.auth._id

  if(!authorized) {
    return res.status(403).json({
      message: 'User is not authorized to perfom this action'
    })
  }
}

// export const getAllUsers = async(req, res) => {
//   const users = await User.find({}).select('name email updated created')

//   res.json(users)
// }


// export const getUser = (req, res) => {
//   return res.json(req.profile)
// }