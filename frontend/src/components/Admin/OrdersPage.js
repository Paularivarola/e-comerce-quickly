import { useEffect, useState } from 'react'
import styles from '../../styles/customer.module.css'
import { connect } from 'react-redux'
import NoResults from './NoResults';
import OrderRow from './OrderRow';
import OrderDetails from './OrderDetails';

const OrderPage = (props) => {
    const [chosen, setChosen] = useState(null)
    console.log(chosen)
    return (
        <section className={styles.customerContainer}>
            <div className={styles.infoTable}>
                <div className={styles.tableHeader}>
                    <h2>Pedidos</h2>
                </div>
                <hr />
                {/* <div className={styles.filterContainer}>
                    <div style={{ width: '100%' }}>Filtrar por:</div>
                    <div>
                        <label htmlFor='nameSearch'>Nombre</label>
                        <input ref={inputVal} style={{ width: '20vw' }} name='name' id="nameSearch" label="Nombre" variant="outlined" onChange={handleChange} />
                    </div>
                </div> */}
                {/* <span className={styles.results}>{`Mostrando ${filtered.length} pedidos de ${props.orders.length}`}</span> */}
                <div className={styles.tableContainer}>
                    <table className={styles.customersTable}>
                        <thead>
                            <tr>
                                <th style={{ width: '15%' }}>Fecha</th>
                                <th style={{ width: '25%' }}>Cliente</th>
                                <th style={{ width: '25%' }}>Total</th>
                                <th style={{ width: '15%' }}>Estado</th>
                                <th style={{ width: '20%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.orders.map(order => <OrderRow order={order} key={order._id} setChosen={setChosen} />)}
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
                {chosen && <OrderDetails order={chosen} setChosen={setChosen} />}
                {/* {!filtered.length && <NoResults />} */}
            </div>
        </section>
    )

}

const mapStateToProps = state => {
    return {
        orders: state.adminOrders.orders
    }
}
export default connect(mapStateToProps)(OrderPage)