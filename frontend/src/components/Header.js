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
    localStorage.getItem('socket') && props.setSocketLS(localStorage.getItem('socket'))
    localStorage.getItem('token') && props.verifyToken()

    // eslint-disable-next-line
  }, [])

  // console.log(props.socket?.id)

  window.onclick = (e) => {
    if (e.target.id !== 'userMenu') setUserMenu(false)
    if (props.user && e.target.id !== 'userMenu') setUserMenu(false)
  }
  let img = props.user
    ? props.user.data.google || props.user.data.admin.flag
      ? props.user.src
      : props.user.src !== 'assets/user.png'
      ? 'http://localhost:4000/' + props.user.data.src
      : '/assets/user.png'
    : '/assets/user.png'

  return (
    <header>
      <div className={styles.boxNavigation}>
        <nav className={styles.containerNavegation}>
          <img className={styles.logo} src='/assets/logoLDC.png' alt='logo' />
          <div className={styles.navegation}>
            <NavLink className={styles.textRoute} exact activeClassName={styles.active} to='/'>
              Home
            </NavLink>
            <NavLink className={styles.textRoute} activeClassName={styles.active} to='/products'>
              Menu
            </NavLink>
            <NavLink className={styles.textRoute} to='/'>
              Promos
            </NavLink>
            <NavLink className={styles.textRoute} to='/'>
              Pedidos
            </NavLink>
            <NavLink className={styles.textRoute} activeClassName={styles.active} to='/contact'>
              Contacto
            </NavLink>
          </div>
          <div className={styles.userData} onClick={() => setUserMenu(!userMenu)}>
            {props.user && (
              <h2 id='userName' className={styles.userName}>
                {props.user.data.firstName}
              </h2>
            )}
            <div
              id='userMenu'
              className={styles.user}
              style={{
                backgroundImage: `url("${img}")`,
              }}
              alt='logo'
            ></div>
          </div>
          {userMenu && (
            <div className={styles.userMenuContainer}>
              <div className={styles.userMenu}>
                {!props.user ? (
                  <>
                    <NavLink className={styles.textRoute} to='/sign-forms/signin'>
                      Ingresar
                    </NavLink>
                    <NavLink className={styles.textRoute} to='/sign-forms/signup'>
                      Registrarse
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className={styles.textRoute} to='/profile/fav'>
                      Favoritos
                    </NavLink>
                    <NavLink className={styles.textRoute} to='/profile/his'>
                      Mis Pedidos
                    </NavLink>
                    <NavLink className={styles.textRoute} to='/profile/data'>
                      Mi Cuenta
                    </NavLink>
                    <NavLink className={styles.textRoute} onClick={() => props.logOut()} to='/'>
                      Salir
                    </NavLink>
                  </>
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
    user: state.users.userData,
    socket: state.users.socket,
  }
}
const mapDispatchToProps = {
  logOut: userActions.logOut,
  setSocketLS: socketActions.setSocketLS,
  verifyToken: userActions.verifyToken,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
