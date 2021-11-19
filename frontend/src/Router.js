import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import Profile from './user/Profile'
import Signin from './user/Signin'
import Signup from './user/Signup'

const Router = () => {
  return(
    <div>
      <Menu />
    <Routes>
      <Route path='/' element={<Home/>} exact/>
      <Route path='/signup' element={<Signup/>} exact/>
      <Route path='/signin' element={<Signin/>} exact/>
      <Route path='/user/:id' element={<Profile/>} exact/>
    </Routes>
  </div>
  )
 
}

export default Router 