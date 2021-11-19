import Post from "../models/post.js";
import { validationResult } from "express-validator";
import formidable from "formidable";
import fs from 'fs'


export const postById = (req, res, next) => {

        const post = User.findById(req.params.id).populate('postedBy', '_id name')

        if(!post) {
            return res.status(400).json({error: 'Empty'})
        }

        res.json(post)
        next()
}

export const getPost = async(req, res) => {
    try {
        const posts = await Post.find().populate('postedBy','_id name').select('_id title body')

       res.json( posts )
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
    
}

export const createPost = async(req, res) => {
    
    const form = new formidable.IncomingForm()
    
    form.keepExtentions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({error: 'Image could not be uploaded'})
        }
        let post = new Post(fields)
        
        post.postedBy = user
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save((err, result) => {
            if(err) {
                return res.status(400).json({error: err})
            } 
            res.json(result)
        })
    })
    
    const {title, body} = req.body
    
    try {
        if(title.length && body.length < 4 ) {
            res.status(404).json({message: 'Input must be more than 4'})
        }
        
        
        const post = await new Post({title, body})
        
        const savePost = await post.save()
        
        res.status(200).send(savePost)
    } catch (error) {
        console.log(error.message);
    }
    // validate error result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
}

export const postsByUser = (req, res) => {

    try {
        const posts = Post.find({postedBy: user._id}).populate('postedBy', '_id name').sort('_created')

        res.json(posts)

    } catch (error) {
        res.status(404).json({message: error.message})
        throw new Error('User not found')
    }

    
    // Post.find({postedBy: user._id})
    // .populate('postedBy', '_id name')
    // .sort('_created')
    // .exec((err, posts) => {
    //     if(err) {
    //         return res.status(400).json({error: err})
    //     }
    //     res.json(posts)
    // })

}
export const updatePost = async(req, res) => {
    const post = await Post.findById(req.params.id)
  
    if(post) {
      post.title = title
      post.body = body
  
      const updatePost = await post.save()
      console.log(updatePost)
    }
}


export const isPoster = (req, res, next) => {
    const isPoster = req.post && req.auth && req.post.postedBy._id === req.auth._id     
    if(!isPoster) {
        return res.status(403).json({error: 'User is not authorized'})
    }

    next()
}

export const deletePost = (req, res) => {
    const post = req.post
    post.remove((err, post) => {
        if(err) {
         
            return res.status(400).json({error: err})
        }
        res.json({message: 'Post deleted succesfully'})
    })
}