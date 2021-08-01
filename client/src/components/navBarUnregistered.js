import React from 'react';
import { Link, navigate } from '@reach/router';
// import bootstrap from 'bootstrap';

const NavBarUnregistered = (props) => {

  const logMeIn = (e) => {
    navigate('/login')
  }
  const signMeUp = (e) => {
    navigate('/signup')
  }

  return(
    <div className="navbar navbar-expand-lg navbar-light bg-dark mb-4">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to= {'/'} className = "link-info ms-sm-2">Home</Link>
        </li>
      </ul>
      <ul className="nav justify-content-end mb-2 mb-lg-0 me-sm-2">
        <li className="nav-item me-sm-2">
          < button className = "btn btn-sm btn-outline-success" onClick = { logMeIn } >
            Login
          </button >
        </li>
        <li className="nav-item ms-sm-2">
          < button className = "btn btn-sm btn-outline-warning" onClick = { signMeUp } >
            Sign Up
          </button >
        </li>
      </ul>
    </div>
  )
}

export default NavBarUnregistered;