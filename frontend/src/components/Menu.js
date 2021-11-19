import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Container, Nav} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from '../auth';
import useStyles from './style'

const signout = (next) => {
  if(typeof window !== 'undefined') localStorage.removeItem('jwt')
  next()
  return fetch('http://localhost/5000/signout', {
    method: "GET"
  })
  .then(response => {
    console.log('signout', response)
    return response.json()
  })
  .catch((err => console.log(err)))
}




const Menu = () => {

  const history = useNavigate()
  const classes = useStyles()

  console.log(isAuthenticated().id)

  return (
    
    <div>
      {/* // <Link to='/'>Home</Link>
      // <Link to='/signin'>Signin</Link>
    // <Link to='/signup'>Signup</Link> */}

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav  className='justify-content-end'>
          <Link className={`${classes.links} `} to='/'>Home</Link>
        
          {!isAuthenticated() && (
            <>
            <Link className={`${classes.links} `} to='/signin'>Signin</Link>,
            <Link className={`${classes.links} `} to='/signup'>Signup</Link>
            </>
          )}

          {isAuthenticated() && (
            <>
            <Link 
            className={`${classes.links} `} 
            to='/signin'
            onClick={()=> signout(() => history('/'))}
            >
              Signout
            </Link>
              
            <Link 
              className={`${classes.links} `}
              to={`/user/${isAuthenticated().id}`}>
                
                {`${isAuthenticated().name}'s profile`}
            </Link>
           </>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Menu
