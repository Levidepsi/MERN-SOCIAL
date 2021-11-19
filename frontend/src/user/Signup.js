import React, {useState, } from 'react'
import { Typography, TextField, Button, Paper } from '@material-ui/core'
import useStyles from './style'

const Signup = () => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    open: false
  })

  const classes = useStyles()

  const clickSubmit = (e) => {
    e.preventDefault()
   
    const {name, email, password, error} = userData

    const user = {
      name,
      email,
      password,
      error
    }

    // console.log(user);
    signup(user)
    .then(data => {
      if(data.error) {
        setUserData({error: data.error})
      } else {
        setUserData({
          error: '',
          name: '',
          email: '',
          password: '',
         open: true
        })
      }
    })
  }

  const signup = (user) => {
    
     return fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

  const {error, open} = userData
  console.log(error)

  return (


    <Paper className={classes.paper}>
        <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={clickSubmit}
        >
          <Typography variant='h6' style={{textAlign: 'center'}}>Signup</Typography>
          {/* <div className='alert alert-primary' style={{display: error ? '' : 'none'}}>
            {error}
          </div> */}
          {error ? <div className='alert alert-danger'>{error}</div> : ''}
          {open ? <div className='alert alert-info'>{open}</div> : ''}
          <TextField 
            name='name'
            variant='outlined'
            // fullWidth
            label='name'
            type='name' 
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value})}
          />
           <TextField 
            name='email'
            variant='outlined'
            label='email'
            type='email'
            // fullWidth
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value})}
          />
           <TextField 
            name='password'
            variant='outlined'
            label='password'
            type='password'
            // fullWidth
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value})}
          />

            <Button
                // className={classes.buttonSubmit}
                variant='contained'
                color='primary'
                type='submit'
                size='large'
                // fullWidth
            
            >
                Submit
            </Button>
        </form>
    </Paper>
  )
}

export default Signup
