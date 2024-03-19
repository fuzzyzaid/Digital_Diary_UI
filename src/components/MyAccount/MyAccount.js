import React from 'react'
import styles from  './MyAccount.module.css'
import Header from '../Header/Header'

function MyAccount() {
  return (
    <div>
      <Header/>
      <div id={styles.mainContainer}>MyAccount</div>
    </div>
    
  )
}

export default MyAccount