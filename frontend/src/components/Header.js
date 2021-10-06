import React, { useEffect } from 'react'
import styles from '../styles/header.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useState } from 'react'

const Header = (props) => {
  const [userMenu, setUserMenu] = useState(false)
  useEffect(() => {
    props.verifyToken()
    // eslint-disable-next-line
  }, [])
  window.onclick = (e) => e.target.id !== 'userMenu' && setUserMenu(false)
  return (
    <header>
    <div class={styles.boxNavigation}>
      <nav className={styles.containerNavegation}>
        <img className={styles.logo} src='/assets/logo-cocina-prueba.png' alt='logo' />
        <div className={styles.navegation}>
          <NavLink className={styles.textRoute} exact activeClassName={styles.active} to='/'>
            Home
          </NavLink>
          <NavLink className={styles.textRoute} activeClassName={styles.active} to='/products'>
            Menu
          </NavLink>
          <NavLink className={styles.textRoute} to='/'>Promos</NavLink>
          <NavLink className={styles.textRoute} to='/'>Pedidos</NavLink>
          <NavLink className={styles.textRoute} activeClassName={styles.active} to='/contact'>
            Contacto
          </NavLink>
        </div>
        <div className={styles.userData} onClick={() => setUserMenu(!userMenu)}>
          {props.user && <h2 className={styles.userName}>{props.user.firstName}</h2>}
          <div id='userMenu' className={styles.user} style={{ backgroundImage: `url("${props.user ? (!props.user.google ? 'http://localhost:4000/' + props.user.src : props.user.src) : '/assets/user.png'}")` }}  alt='logo'></div>
        </div>
        {userMenu && (
          <div className={styles.userMenuContainer}>
            <div className={styles.userMenu}>
              {!props.user ? (
                <>
                  <NavLink className={styles.textRoute} to='/sign-forms/signin'>Sign In</NavLink>
                  <NavLink className={styles.textRoute} to='/sign-forms/signup'>Sign Up</NavLink>
                </>
              ) : (
                <NavLink className={styles.textRoute} onClick={() => props.logOut()} to='/'>
                  Log Out
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
    </header>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}
const mapDispatchToProps = {
  logOut: userActions.logOut,
  verifyToken: userActions.verifyToken,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
