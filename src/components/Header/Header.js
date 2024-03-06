import React from 'react'
import {Link,NavLink} from 'react-router-dom';
import styles from './Header.module.css'

function Header() {
  return (
    <div id={styles.headerComponent}>
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