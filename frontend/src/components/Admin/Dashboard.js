import { useState } from 'react'
import styles from '../../styles/dashboard.module.css'
import AdminMenu from './AdminMenu'
import Customers from './Customers'
import Orders from './Orders'

const Dashboard = () => {
    const [view, setView] = useState('dashboard')
    const [open, setOpen] = useState(true)

    return (
        <>
            <div className={styles.mainContainer}>
                <AdminMenu open={open} />
                <main className={styles.bodyContainer} >
                    <section className={styles.header}>
                        <i class="fas fa-bars" onClick={() => setOpen(!open)}></i>
                        <div className={styles.userSection}>
                            <i class="far fa-envelope"></i>
                            <i class="fas fa-bell"></i>
                            <div className={styles.profilePic} style={{ backgroundImage: "url('https://www.tsensor.online/wp-content/uploads/2020/04/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png')" }}></div>
                        </div>
                    </section>
                    <section className={styles.viewContainer}>
                        {view}
                    </section>
                </main>
            </div>
        </>
    )
}

export default Dashboard