import React from 'react'
import {Link,NavLink} from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <div id="headerComponent">
        <nav>
            <ul>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/myAccount">My Account</NavLink>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/login">Login</NavLink>               
            </ul>
        </nav>
    </div>
  )
}

export default Header