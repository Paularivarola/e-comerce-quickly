import React from "react"
import styles from "../styles/header.module.css"
import { NavLink, Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <div class={styles.boxNavigation}>
        <nav class={styles.containerNavegation}>
            <img
              class={styles.logo}
              src="/assets/logo-cocina-prueba.png"
              alt="logo"
            />
          <div class={styles.navegation}>
            <NavLink exact activeClassName={styles.active} to="/">
              Home
            </NavLink>
            <NavLink activeClassName={styles.active} to="/product">
              Platos
            </NavLink>
            <NavLink to="/">Promos</NavLink>
            <NavLink to="/">Pedidos</NavLink>
            <NavLink activeClassName={styles.active} to="/contact">
              Contacto
            </NavLink>
          </div>
          <img class={styles.user} src="../assets/user.png" alt="logo" />
        </nav>
      </div>
    </header>
  )
}

export default Header
