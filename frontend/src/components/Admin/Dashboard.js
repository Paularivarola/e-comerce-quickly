import styles from '../../styles/dashboard.module.css'

import { FaClipboardList, FaUserTie, FaCashRegister } from "react-icons/fa";
import { MdShoppingCart } from 'react-icons/md'

const Dashboard = (props) => {
    return (
        <section className={styles.dashboardContainer}>
            <h1>Welcome Back, Admin.</h1>
            <div className={styles.resumeContainer}>
                <div className={styles.resumeBox}>
                    <div className={styles.boxOne}><MdShoppingCart /></div>
                    <div className={styles.data}>
                        <p>Productos Activos</p>
                        <span onClick={() => props.setView('Productos')}>52</span>
                    </div>
                </div>
                <div className={styles.resumeBox}>
                    <div className={styles.boxTwo}><FaClipboardList /></div>
                    <div className={styles.data}>
                        <p>Pedidos de Hoy</p>
                        <span>5</span>
                    </div>
                </div>
                <div className={styles.resumeBox}>
                    <div className={styles.boxThree}><FaUserTie /></div>
                    <div className={styles.data}>
                        <p>Usuarios Registrados</p>
                        <span>15</span>
                    </div>
                </div>
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
                        <button>Ver todos</button>
                    </div>
                    <hr />
                </div>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Pedidos Completados</h2>
                        <button>Ver todos</button>
                    </div>
                    <hr />

                </div>
            </section>
            <section className={styles.topProducts}>
                <div className={styles.tableHeader}>
                    <h2>Productos Más Vendidos</h2>
                    <button>Ver todos</button>
                </div>
                <hr />
                <div className={styles.bestSeller}>
                    <div className="product">
                        <div className="imageProduct" style={{ backgroundImage: 'url("/assets/pizzas.jpeg")', height: '150px' }}>
                        </div>
                        <div className="productTitle">
                            <h2>producto</h2>
                            <h3 className="price">$150</h3>
                        </div>
                        <div className="productButton">
                            <button>Editar</button>
                        </div>
                    </div>
                    <div className="product">
                        <div className="imageProduct" style={{ backgroundImage: 'url("/assets/pizzas.jpeg")', height: '150px' }}>
                        </div>
                        <div className="productTitle">
                            <h2>producto</h2>
                            <h3 className="price">$150</h3>
                        </div>
                        <div className="productButton">
                            <button>Editar</button>
                        </div>
                    </div>
                    <div className="product">
                        <div className="imageProduct" style={{ backgroundImage: 'url("/assets/pizzas.jpeg")', height: '150px' }}>
                        </div>
                        <div className="productTitle">
                            <h2>producto</h2>
                            <h3 className="price">$150</h3>
                        </div>
                        <div className="productButton">
                            <button>Editar</button>
                        </div>
                    </div>
                    <div className="product">
                        <div className="imageProduct" style={{ backgroundImage: 'url("/assets/pizzas.jpeg")', height: '150px' }}>
                        </div>
                        <div className="productTitle">
                            <h2>producto</h2>
                            <h3 className="price">$150</h3>
                        </div>
                        <div className="productButton">
                            <button>Editar</button>
                        </div>
                    </div>
                </div>
            </section>


            <section className={styles.tableContainerBig}>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Cantidad de Visitas</h2>
                    </div>
                    <hr />
                </div>
                <div className={styles.infoTable}>
                    <div className={styles.tableHeader}>
                        <h2>Pedidos Completados</h2>
                        <button>Ver todos</button>
                    </div>
                    <hr />
                </div>
            </section>
        </section>
    )
}

export default Dashboard