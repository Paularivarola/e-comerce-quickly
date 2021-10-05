import React from 'react'
import styles from '../../styles/adminMenu.module.css'

const AdminMenu = (props) => {
    return (
        <header className={props.open ? `${styles.mainContainer}` : `${styles.close}`}>
            <div className={styles.logoContainer} style={{ backgroundImage: "url('https://via.placeholder.com/150.png?text=Logo')" }}></div>
            <nav className={styles.adminNav}>
                <i class="fas fa-tachometer-alt"></i>Panel

            </nav>
        </header >
    )
}

export default AdminMenu