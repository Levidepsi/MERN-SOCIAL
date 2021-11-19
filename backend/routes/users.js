import express from 'express'

import {  deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.js'


const router = express.Router()

router.get('/' ,getUsers)
router.get('/:id' ,getUserById)
router.put('/:id' ,updateUser)
router.delete('/:id' ,deleteUser)
// router.param('userId', userById)

export default router