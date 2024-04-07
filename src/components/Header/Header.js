import React from 'react'
import {NavLink} from 'react-router-dom';
import styles from './Header.module.css'

function Header() {
  return (
    <div id={styles.headerComponent}>
        <nav>
            <ul>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/myAccount">My Account</NavLink>
                {/* <NavLink to="/signup">Signup</NavLink> */}
                <NavLink to="/addNote">Add Note</NavLink>
                {/* <NavLink to="/login">Login</NavLink> */}
                <NavLink to="/logout">Logout</NavLink>               
            </ul>
        </nav>
    </div>
  )
}

export default Header