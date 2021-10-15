import styles from '../../styles/dashboard.module.css'
import styles2 from '../../styles/customer.module.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaClipboardList, FaUserTie, FaCashRegister } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'
import Button from '@mui/material/Button'
import Categories from './Categories'
import DashboardCard from './DashboardCard'
import OrdersHistory from './OrdersHistory'
import Order from './Orders'
import { useState, useEffect } from 'react'

const Dashboard = (props) => {
    const [orders, setOrders] = useState(props.orders)

    useEffect(() => {
        setOrders(props.orders)
    }, [props.orders])

    let today = (new Date).toLocaleDateString()
    const todayOrders = props.orders.filter(order => (new Date(Date.parse(order.date))).toLocaleDateString() === today)
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    })
    console.log(todayOrders)
    const todayIncome = todayOrders.reduce((acc, order) => {
        if (order.status !== 'Cancelado') {
            let subTotal = order.purchased.reduce((acc, order) => {
                var sub = acc + order.totalPrice + order.totalAmount * order.drink.cost + order.totalAmount * order.fries.cost
                return sub
            }, 0)
            var total = acc + subTotal
        }
        return total
    }, 0)
    console.log(todayIncome)
    return (
        <section className={styles.dashboardContainer}>
            <h1>Bienvenido, Admin.</h1>

            <div className={styles.resumeContainer}>
                <DashboardCard data={{ title: 'Productos Activos', qty: props.products.length, route: 'productos' }} icon={<MdShoppingCart />} setView={props.setView} view='Productos' color={styles.boxOne} />
                <DashboardCard data={{ title: 'Pedidos de Hoy', qty: todayOrders.length, route: 'pedidos' }} icon={<FaClipboardList />} setView={props.setView} view='Pedidos' color={styles.boxTwo} />
                <DashboardCard data={{ title: 'Usuarios Registrados', qty: props.users.length, route: 'clientes' }} icon={<FaUserTie />} setView={props.setView} view='Clientes' color={styles.boxThree} />
                <div className={styles.resumeBox}>
                    <div className={styles.boxFour}>
                        <FaCashRegister />
                    </div>
                    <div className={styles.data}>
                        <p>Ingresos de Hoy</p>
                        <span className={styles.noLink}>{!isNaN(todayIncome) ? formatter.format(todayIncome) : '$0'}</span>
                    </div>
                </div>
            </div>

            <section className={styles.tableContainer}>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Pedidos Pendientes</h2>
                        <Button variant='contained' color='info' size='medium' onClick={() => props.setView('Pedidos')}>
                            <Link to='/admin/pedidos'>Ver Todos</Link>
                        </Button>
                    </div>
                    <hr />
                    <div className={styles2.tableContainer}>
                        <table className={styles2.customersTable}>
                            <thead>
                                <tr>
                                    <th>Orden N° </th>
                                    <th>Cliente</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map(order => {
                                    if (order.status !== 'Entregado') {
                                        return <Order order={order} key={order._id} />
                                    }
                                    return true
                                }
                                )}
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>

                    {!orders.filter(order => order.status !== 'Entregado').length && <span>No existen pedidos pendientes</span>}
                </div>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Pedidos Completados</h2>
                        <Button variant='contained' color='info' size='medium' onClick={() => props.setView('Pedidos')}>
                            <Link to='/admin/pedidos'>Ver Todos</Link>
                        </Button>
                    </div>
                    <hr />
                    <div className={styles2.tableContainer}>
                        <table className={styles2.customersTable}>
                            <thead>
                                <tr>
                                    <th>Orden N°</th>
                                    <th>Cliente</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map(order => {
                                    if (order.status === 'Entregado') {
                                        return <Order order={order} key={order._id} />
                                    }
                                    return true
                                }
                                )}
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                    {!orders.filter(order => order.status === 'Entregado').length && <span>Aún no existen pedidos completados.</span>}

                </div>
            </section>
            <section className={styles.tableContainerBig}>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Productos por categoría</h2>
                    </div>
                    <hr />
                    <Categories products={props.products} />
                </div>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Pedidos de Hoy</h2>
                    </div>
                    <hr />
                    <OrdersHistory orders={orders} />
                </div>
            </section>
        </section>
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.adminProducts.products,
        orders: state.adminOrders.orders,
        users: state.adminUsers.users,
        user: state.users.userData,
    }
}
export default connect(mapStateToProps)(Dashboard)
