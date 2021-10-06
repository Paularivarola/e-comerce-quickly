import React, { useEffect } from 'react'
import styles from '../styles/header.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useState } from 'react'
import socketActions from '../redux/actions/socketActions'

const Header = (props) => {
  const [userMenu, setUserMenu] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setSocketLS(localStorage.getItem('socket'))
      props.verifyToken()
    }
    // eslint-disable-next-line
  }, [])
  console.log(props.socket)
  window.onclick = (e) => e.target.id !== 'userMenu' && setUserMenu(false)
  return (
    <header>
      <nav className={styles.containerNavegation}>
        <img className={styles.logo} src='/assets/logo-cocina-prueba.png' alt='logo' />
        <div className={styles.navegation}>
          <NavLink exact activeClassName={styles.active} to='/'>
            Home
          </NavLink>
          <NavLink activeClassName={styles.active} to='/product'>
            Platos
          </NavLink>
          <NavLink to='/'>Promos</NavLink>
          <NavLink to='/'>Pedidos</NavLink>
          <NavLink activeClassName={styles.active} to='/contact'>
            Contacto
          </NavLink>
        </div>
        <div className={styles.userData} onClick={() => setUserMenu(true)}>
          {props.user && <h2>{props.user.firstName}</h2>}
          <img
            id='userMenu'
            className={styles.user}
            src={
              props.user
                ? !props.user.google
                  ? 'http://localhost:4000/' + props.user.src
                  : props.user.src
                : '/assets/user.png'
            }
            alt='logo'
          />
        </div>
        {userMenu && (
          <div className={styles.userMenuContainer}>
            <div className={styles.userMenu}>
              {!props.user ? (
                <>
                  <NavLink to='/sign-forms/signin'>Sign In</NavLink>
                  <NavLink to='/sign-forms/signup'>Sign Up</NavLink>
                </>
              ) : (
                <NavLink onClick={() => props.logOut()} to='/'>
                  Log Out
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    socket: state.users.socket,
  }
}
const mapDispatchToProps = {
  logOut: userActions.logOut,
  setSocketLS: socketActions.setSocketLS,
  verifyToken: userActions.verifyToken,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
