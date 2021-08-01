import React from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const NavBarRegistered = (props) => {

  const logMeOut = (e) => {
    axios.get('http://localhost:8000/api/logout', { withCredentials: true })
      .then(() => navigate('/'))
  }

  return(
    <div className="navbar navbar-expand-lg navbar-light bg-dark mb-4">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <button className = "btn btn-outline-danger me-2" onClick = { logMeOut } >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default NavBarRegistered;