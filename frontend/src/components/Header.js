import React, { useEffect } from 'react'
import styles from '../styles/header.module.css'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useState } from 'react'
import { RiMenuFoldLine } from 'react-icons/ri'

const Header = (props) => {
  const [userMenu, setUserMenu] = useState(false)
  useEffect(() => {
    localStorage.getItem('token') && props.verifyToken()
    !localStorage.getItem('cart') && localStorage.setItem('cart', JSON.stringify([]))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(props.socket?.id)

  window.onclick = (e) => {
    if (e.target.dataset.usermenu !== 'true') setUserMenu(false)
    if (props.user && e.target.dataset.usermenu !== 'true') setUserMenu(false)
  }

  let img = props.user
    ? props.user.data.google || props.user.data.admin.flag
      ? props.user.data.src
      : props.user.data.src !== 'assets/user.png'
      ? 'http://localhost:4000/' + props.user.data.src
      : '/assets/user.png'
    : '/assets/user.png'

  const MyNavLink = ({ path, page }) => (
    <NavLink
      onClick={() => setUserMenu(false)}
      exact={path === '/'}
      className={styles.textRoute}
      activeClassName={styles.activeHamburguesa}
      to={path}
      onClick={onclick ? onclick : () => setUserMenu(false)}
    >
      {page}
    </NavLink>
  )

  return (
    <header>
      <div className={styles.boxNavigation}>
        <nav className={styles.containerNavegation}>
          <img className={styles.logo} src='/assets/quicklyLogo.png' alt='logo' />
          <div className={styles.navegation}>
            <NavLink className={styles.textRoute} exact activeClassName={styles.active} to='/' onClick={() => setUserMenu(false)}>
              Home
            </NavLink>
            <NavLink
              className={styles.textRoute}
              activeClassName={styles.active}
              to='/products'
              onClick={() => setUserMenu(false)}
            >
              Menu
            </NavLink>
            <NavLink
              className={styles.textRoute}
              activeClassName={styles.active}
              to='/contact'
              onClick={() => setUserMenu(false)}
            >
              Contacto
            </NavLink>
          </div>
          <div className={styles.userData} onClick={() => setUserMenu(!userMenu)}>
            {props.user && (
              <h2 data-usermenu={true} id='userName' className={styles.userName}>
                {props.user.data.firstName}
              </h2>
            )}
            <div
              data-usermenu={true}
              className={styles.user}
              style={{
                backgroundImage: `url("${img}")`,
              }}
              alt='logo'
            ></div>
          </div>

          <RiMenuFoldLine data-usermenu={true} onClick={() => setUserMenu(!userMenu)} className={styles.menuHamburguesa} />
        </nav>
      </div>
      {userMenu && (
        <div className={props.user ? styles.userMenuContainerLogged : styles.userMenuContainer}>
          <div className={styles.userMenu}>
            {!props.user ? (
              <>
                {
                  <span className={styles.salvador}>
                    <MyNavLink page={'Home'} path={'/'} />
                    <MyNavLink page={'Menu'} path={'/products/all'} />
                    <MyNavLink page={'Contacto'} path={'/contact'} />
                  </span>
                }
                <MyNavLink page={'Ingresar'} path={'/sign-forms/signin'} />
                <MyNavLink page={'Registrarse'} path={'/sign-forms/signup'} />
              </>
            ) : (
              <>
                {
                  <span className={styles.salvador}>
                    <MyNavLink page={'Home'} path={'/'} />
                    <MyNavLink page={'Menu'} path={'/products/all'} />
                    <MyNavLink page={'Contacto'} path={'/contact'} />
                  </span>
                }
                <MyNavLink page={'Mis Favoritos'} path={'/profile/fav'} />
                <MyNavLink page={'Mis Pedidos'} path={'/profile/his'} />
                <MyNavLink page={'Mi Cuenta'} path={'/profile/data'} />
                <Link
                  className={styles.textRoute}
                  to='/'
                  onClick={() => {
                    props.logOut()
                    setUserMenu(false)
                  }}
                >
                  Salir
                </Link>
              </>
            )}
          </div>
        </div>
      )}
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
  verifyToken: userActions.verifyToken,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
