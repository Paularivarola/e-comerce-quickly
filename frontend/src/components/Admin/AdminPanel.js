import { useEffect, useState } from 'react'
import styles from '../../styles/adminPanel.module.css'
import AdminMenu from './AdminMenu'
import Dashboard from './Dashboard'
import Customers from './Customers'
import Orders from './Orders'
import Products from './Products'

const AdminPanel = () => {
    const [view, setView] = useState('Escritorio')
    const [open, setOpen] = useState(true)
    useEffect(() => {
        document.title = 'Escritorio - Mi Cocina'
    }, [])

    useEffect(() => {
        switch (view) {
            case 'Clientes':
                document.title = 'Clientes - Mi Cocina'
                break
            case 'Pedidos':
                document.title = 'Pedidos - Mi Cocina'
                break
            case 'Productos':
                document.title = 'Productos - Mi Cocina'
                break
            default:
                document.title = 'Escritorio - Mi Cocina'
        }
    }, [view])

    return (
        <>
            <div className={styles.mainContainer}>
                <AdminMenu open={open} setView={setView} />
                <main className={styles.bodyContainer} >
                    <section className={styles.header}>
                        <i class="fas fa-bars" onClick={() => setOpen(!open)}></i>
                        <h1>{view}</h1>
                        <div className={styles.userSection}>
                            <i class="far fa-envelope"></i>
                            <i class="fas fa-bell"></i>
                            <div className={styles.profilePic} style={{ backgroundImage: "url('https://www.tsensor.online/wp-content/uploads/2020/04/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png')" }}></div>
                        </div>
                    </section>
                    <section className={styles.viewContainer}>
                        {view === 'Escritorio' && <Dashboard setView={setView} />}
                        {view === 'Clientes' && <Customers />}
                        {view === 'Pedidos' && <Orders />}
                        {view === 'Productos' && <Products />}
                    </section>
                </main>
            </div>
        </>
    )
}

export default AdminPanel