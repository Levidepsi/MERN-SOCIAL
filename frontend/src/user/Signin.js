import React, {useState, useEffect} from 'react'
import { Typography, TextField, Button, Paper } from '@material-ui/core'
import { useNavigate } from "react-router-dom";
import useStyles from './style'

const Signin = () => {
  const history = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')
  const [ open, setOpen ] = useState(false)
  const [ redirectToReferer, setRedirectToReferer ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const classes = useStyles()

  const clickSubmit = (e) => {
    e.preventDefault()
    setLoading( true)

    const user ={ email, password }
  
    const authenticate = (jwt, next) => {
      if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt))
        next()
      }
    }

    console.log(user);
    signin(user)
    .then(data => {
      if(data.error) {
        setError(data.error)
        setLoading(false)
      } else {
        authenticate(data, () => {
          setRedirectToReferer(true)
        })
      }
    })

  }

  useEffect(() => {
    if(redirectToReferer) {
      history('/')
     
    }
  },[history, redirectToReferer])

  const signin = (user) => {
     return fetch('http://localhost:5000/signin', {
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
    .catch(error => console.log(error))
  }



  return (


    <Paper className={classes.paper}>
        <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={clickSubmit}
        >
          <Typography variant='h6' style={{textAlign: 'center'}}>Signin</Typography>
          {/* <div className='alert alert-primary' style={{display: error ? '' : 'none'}}>
            {error}
          </div> */}
          {error ? <div className='alert alert-danger'>{error}</div> : ''}
         
           <TextField 
            name='email'
            variant='outlined'
            label='email'
            type='email'
            // fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <TextField 
            name='password'
            variant='outlined'
            label='password'
            type='password'
            // fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

            <Button
                // className={classes.buttonSubmit}
                variant='contained'
                color='primary'
                type='submit'
                size='large'
                // fullWidth
                onClick={clickSubmit}
            >
                Submit
            </Button>

            {loading ? <div className='jumbotron text-center'>
              <h2>Loading...</h2>
            </div>: ''}
        </form>
    </Paper>
  )
}

export default Signin
