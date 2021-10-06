import React, { useState } from 'react'
import styles from '../../styles/adminMenu.module.css'
import { MdDashboard, MdPerson, MdFastfood, MdFileCopy, MdKeyboardArrowDown } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa'

const AdminMenu = (props) => {
    const [active, setActive] = useState('dashboard')

    return (
        <header className={props.open ? `${styles.mainContainer}` : `${styles.close}`}>
            <img src="/assets/logo-cocina-prueba.png" style={{ width: '100%', marginTop: '5vh' }} />
            <nav className={styles.adminNav}>
                <span onClick={() => {
                    setActive('dashboard')
                    props.setView('Escritorio')
                }} className={active === 'dashboard' ? `${styles.navItemActive}` : `${styles.navItem}`}><MdDashboard />Escritorio</span>
                <span onClick={() => {
                    setActive('clientes')
                    props.setView('Clientes')
                }} className={active === 'clientes' ? `${styles.navItemActive}` : `${styles.navItem}`}><MdPerson />Clientes</span>
                <span onClick={() => {
                    setActive('ordenes')
                    props.setView('Pedidos')
                }} className={active === 'ordenes' ? `${styles.navItemActive}` : `${styles.navItem}`}><MdFileCopy />Pedidos</span>
                <span onClick={() => {
                    setActive('productos')
                    props.setView('Productos')
                }} className={active === 'productos' ? `${styles.navItemActive}` : `${styles.navItem}`}><MdFastfood />Productos</span>
            </nav>
        </header >
    )
}

export default AdminMenu