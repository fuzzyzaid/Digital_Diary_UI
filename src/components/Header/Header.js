import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h2 className="m-4">DiZtal Diary</h2>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/logout">
              <i className={`bi bi-box-arrow-right ${styles.logoutIcon}`}></i>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
