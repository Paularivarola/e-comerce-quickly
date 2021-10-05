import { useState } from 'react'
import styles from '../../styles/dashboard.module.css'
import AdminMenu from './AdminMenu'

const Dashboard = () => {
    const [open, setOpen] = useState(true)

    return (
        <>
            <div className={styles.mainContainer}>
                <AdminMenu open={open} />
                <main className={open ? `${styles.bodyContainer}` : `${styles.bodyContainerExpanded}`}>
                    <section className={styles.header}>
                        <i class="fas fa-bars" onClick={() => setOpen(!open)}></i>
                    </section>
                    <section className={styles.viewContainer}>

                    </section>
                </main>
            </div>
        </>
    )
}

export default Dashboard