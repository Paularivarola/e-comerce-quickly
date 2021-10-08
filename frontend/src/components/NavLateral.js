import React from 'react'
import styles from '../styles/profile.module.css'
import NavItems from './NavItems'

const NavLateral = (props) => {
  const { navItems, setSubComp, selectComponent } = props

  return (
    <nav className={styles.adminNav}>
      <div className={styles.item}>
        {navItems?.map((item, index) => (
          <div className={styles.boxItem}>
          <NavItems
            item={item}
            index={index}
            setSubComp={setSubComp}
            selectComponent={selectComponent}
          />
          </div>
        ))}
      </div>
    </nav>
  )
}

export default NavLateral
