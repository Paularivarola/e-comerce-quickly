import styles from '../../styles/dashboard.module.css'
import styles2 from '../../styles/customer.module.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaClipboardList, FaUserTie, FaCashRegister } from "react-icons/fa";
import { MdShoppingCart } from 'react-icons/md'
import Button from '@mui/material/Button';
import Visits from './Visits';
import Categories from './Categories';
import ProductCard from './ProductCard';
import DashboardCard from './DashboardCard';
import OrdersHistory from './OrdersHistory';

const Dashboard = (props) => {
    window.scrollTo(0, 0)
    const todayOrders = props.orders.filter(order => order.date === Date.now())
    console.log(props.user)
    // const todayIncome = 
    return (
        <section className={styles.dashboardContainer}>
            <h1>Bienvenido, Admin.</h1>

            <div className={styles.resumeContainer}>
                <DashboardCard
                    data={{ title: 'Productos Activos', qty: props.products.length, route: 'productos' }}
                    icon={<MdShoppingCart />}
                    setView={props.setView} view='Productos'
                    color={styles.boxOne}
                />
                <DashboardCard
                    data={{ title: 'Pedidos de Hoy', qty: todayOrders.length, route: 'pedidos' }}
                    icon={<FaClipboardList />}
                    setView={props.setView} view='Pedidos'
                    color={styles.boxTwo}
                />
                <DashboardCard
                    data={{ title: 'Usuarios Registrados', qty: props.users.length, route: 'clientes' }}
                    icon={<FaUserTie />}
                    setView={props.setView} view='Clientes'
                    color={styles.boxThree}
                />
                <div className={styles.resumeBox}>
                    <div className={styles.boxFour}><FaCashRegister /></div>
                    <div className={styles.data}>
                        <p>Ingresos de Hoy</p>
                        <span className={styles.noLink}>$55.780</span>
                    </div>
                </div>
            </div>

            <section className={styles.tableContainer}>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Pedidos Pendientes</h2>
                        <Button variant="contained" color="info" size="medium" onClick={() => props.setView('Pedidos')}><Link to='/admin/productos'>Ver Todos</Link></Button>
                    </div>
                    <hr />
                    <div className={styles.orders}>
                        <span>No existen pedidos pendientes</span>
                    </div>
                </div>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Pedidos Completados</h2>
                        <Button variant="contained" color="info" size="medium" onClick={() => props.setView('Pedidos')}><Link to='/admin/productos'>Ver Todos</Link></Button>
                    </div>
                    <hr />
                    <div className={styles2.tableContainer}>
                        <table className={styles2.customersTable}>
                            <thead>
                                <tr>
                                    <th>Orden N°</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>354</td>
                                    <td>Rafael Mian</td>
                                    <td>$15.790</td>
                                </tr>
                                <tr>
                                    <td>352</td>
                                    <td>Daniel Sepúlveda</td>
                                    <td>$25.890</td>
                                </tr>
                                <tr>
                                    <td>351</td>
                                    <td>Cristian Tortoza</td>
                                    <td>$36.560</td>
                                </tr>
                            </tbody>
                            <tfoot>

                            </tfoot>
                        </table>
                    </div>

                </div>
            </section>

            <section className={styles.topProducts}>
                <div className={styles.tableHeader}>
                    <h2>Productos Más Vendidos</h2>
                    <Button variant="contained" color="info" size="medium" onClick={() => props.setView('Productos')}><Link to='/admin/productos'>Ver Todos</Link></Button>

                </div>
                <hr />
                <div className={styles.bestSeller}>
                    <ProductCard data={{ name: 'Nombre de Producto', image: '/assets/pizzas.jpeg', price: 150 }} />
                    <ProductCard data={{ name: 'Nombre de Producto', image: '/assets/pizzas.jpeg', price: 150 }} />
                    <ProductCard data={{ name: 'Nombre de Producto', image: '/assets/pizzas.jpeg', price: 150 }} />
                    <ProductCard data={{ name: 'Nombre de Producto', image: '/assets/pizzas.jpeg', price: 150 }} />
                </div>
            </section>


            <section className={styles.tableContainerBig}>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Visitas últimos 7 días</h2>
                    </div>
                    <hr />
                    <Visits />
                </div>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Productos por categoría</h2>
                    </div>
                    <hr />
                    <Categories products={props.products} />
                </div>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Pedidos últimos 7 días</h2>
                    </div>
                    <hr />
                    <OrdersHistory />
                </div>
            </section>
        </section>
    )
}
const mapStateToProps = state => {
    return {
        products: state.adminProducts.products,
        orders: state.adminOrders.orders,
        users: state.adminUsers.users,
        user: state.users.userData
    }
}
export default connect(mapStateToProps)(Dashboard)