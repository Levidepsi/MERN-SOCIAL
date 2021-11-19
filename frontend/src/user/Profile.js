import React, {useState, useEffect} from 'react'
import { Typography } from '@material-ui/core'
import { useParams } from 'react-router'
import { isAuthenticated } from '../auth'

const Profile = () => {
  const params = useParams()
  
  const id = params.id
  // console.log(id)
  
  const [user, setUser] = useState('')
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  
  // useEffect(() => {
    
  //   fetch(`http://localhost/5000/user/${id}`, {
  //     method: 'GET',
  //     headers: {
  //         Accept: 'application/json',
  //         "Content-Type": "application/json",
  //         Authrization: `Bearer ${isAuthenticated().token}` 
  //     }
  //   })
  //   .then(data => {
  //     if(data.error) {
  //       console.log('ERROR');
  //     } else {
  //       console.log(data)
  //     }
  //   })
  // },[id])  

  return (
    <div className='container'>
      <Typography variant='h6' >Profile</Typography>
      <p>Hellow {isAuthenticated().name}</p>
      <p>Email {isAuthenticated().email}</p>
    </div>
  )
}

export default Profile
