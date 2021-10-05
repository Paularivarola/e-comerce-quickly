import React from "react";
import styles from "../styles/header.module.css";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav class={styles.containerNavegation}>
        <img
          class={styles.logo}
          src="../assets/logo-cocina-prueba.png"
          alt="logo"
        />
        <div class={styles.navegation}>
          <NavLink class={styles.active} to="/">Home</NavLink>
          <NavLink to="/">Platos</NavLink>
          <NavLink to="/">Promos</NavLink>
          <NavLink to="/">Pedidos</NavLink>
          <NavLink to="/">Contacto</NavLink>
        </div>
        <img
          class={styles.user}
          src="../assets/user.png"
          alt="logo"
        />
      </nav>
    </header>
  );
};

export default Header;
