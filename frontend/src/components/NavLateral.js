import React, { useState } from 'react'
import styles from '../styles/adminMenu.module.css'
import NavItems from './NavItems'

const NavLateral = (props) => {
  const { navItems, setSubComp, selectComponent } = props

  return (
    // <header className={props.open ? `${styles.mainContainer}` : `${styles.close}`}>
    //   <img src='/assets/logo-cocina-prueba.png' style={{ width: '100%', marginTop: '5vh' }} alt='Logo' />
    <nav className={styles.adminNav}>
      <div>
        {navItems?.map((item, index) => (
          <NavItems
            item={item}
            index={index}
            setSubComp={setSubComp}
            selectComponent={selectComponent}
          />
        ))}
      </div>
    </nav>
    // </header>
  )
}

export default NavLateral
