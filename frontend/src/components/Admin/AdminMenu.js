import React, { useState } from 'react'
import styles from '../../styles/adminMenu.module.css'
import { MdDashboard, MdPerson, MdFastfood, MdFileCopy, MdKeyboardArrowDown } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa'

const AdminMenu = (props) => {
    const [active, setActive] = useState('dashboard')

    return (
        <header className={props.open ? `${styles.mainContainer}` : `${styles.close}`}>
            <div className={styles.logoContainer} style={{ backgroundImage: "url('https://via.placeholder.com/150.png?text=Logo')" }}></div>
            <nav className={styles.adminNav}>
                <span onClick={() => setActive('dashboard')} className={active === 'dashboard' ? `${styles.navItemActive}` : `${styles.navItem}`}><MdDashboard />Escritorio</span>
                <span onClick={() => setActive('clientes')} className={active === 'clientes' ? `${styles.navItemActive}` : `${styles.navItem}`}><MdPerson />Clientes</span>
                <span onClick={() => setActive('ordenes')} className={active === 'ordenes' ? `${styles.navItemActive}` : `${styles.navItem}`}><MdFileCopy />Órdenes</span>
                <span onClick={() => setActive('productos')} className={active === 'productos' ? `${styles.navItemActive}` : `${styles.navItem}`}><MdFastfood />Productos</span>
            </nav>
        </header >
    )
}

export default AdminMenu