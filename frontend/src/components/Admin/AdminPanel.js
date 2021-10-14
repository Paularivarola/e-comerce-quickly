import styles from '../../styles/adminPanel.module.css'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AdminMenu from './AdminMenu'
import Dashboard from './Dashboard'
import Customers from './Customers'
import Customer from './Customer'
import Orders from './Orders'
import Products from './Products'
import Abandoned from './Abandoned'
import Reviews from './Reviews'
import Product from './Product'
import Preloader from '../Preloader'
import { FaBell, FaEnvelope } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import adminUsersActions from '../../redux/actions/admin/adminUserActions'
import adminProductActions from '../../redux/actions/admin/adminProductActions'
import adminOrderActions from '../../redux/actions/admin/adminOrderActions'
import Swal from 'sweetalert2'
import CustomerDetails from './CustomerDetails'

const AdminPanel = (props) => {
    window.scrollTo(0, 0)
    const [view, setView] = useState('Escritorio')
    const [open, setOpen] = useState(true)
    const [loader, setLoader] = useState(true)

    const getAllData = async () => {
        try {
            await props.getOrders()
            await props.getUsers()
            await props.getProducts()
            setLoader(false)
        } catch (error) {
            Swal.fire('Tenemos problemas en estos momentos. Por favor intenta más tarde.')
        }
    }
    useEffect(() => {
        // document.title = 'Escritorio - Mi Cocina'
        setView(props.view)
        getAllData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        document.title = `${view} - Mi Cocina`
    }, [view])

    if (loader) {
        return <Preloader />
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <AdminMenu open={open} view={view} setView={setView} />
                <main className={styles.bodyContainer} >
                    <section className={styles.header}>
                        <MdOutlineMenu onClick={() => setOpen(!open)} />
                        <h1>{view}</h1>
                        <div className={styles.userSection}>
                            <FaEnvelope />
                            <FaBell />
                            <div className={styles.profilePic} style={{ backgroundImage: "url('https://www.tsensor.online/wp-content/uploads/2020/04/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png')" }}></div>
                        </div>
                    </section>
                    <section className={styles.viewContainer}>
                        {view === 'Escritorio' && <Dashboard setView={setView} />}
                        {view === 'Clientes' && <Customers setView={setView} />}
                        {view === 'Nuevo Usuario' && <Customer />}
                        {view === 'Pedidos' && <Orders />}
                        {view === 'Carros Abandonados' && <Abandoned />}
                        {view === 'Productos' && <Products setView={setView} />}
                        {view === 'Reviews' && <Reviews />}
                        {view === 'Nuevo Producto' && <Product edited={false} />}
                        {view === 'Editar Producto' && <Product edited={true} />}
                        {view === 'Información de Cliente' && <CustomerDetails setView={setView} />}
                    </section>
                </main>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    getUsers: adminUsersActions.getUsers,
    getProducts: adminProductActions.getProducts,
    getOrders: adminOrderActions.getOrders
}

export default connect(null, mapDispatchToProps)(AdminPanel)