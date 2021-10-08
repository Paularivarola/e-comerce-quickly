import styles from '../../styles/customer.module.css'
import { MdEdit, MdDelete, MdPersonAdd } from "react-icons/md";
import * as React from 'react';
import Button from '@mui/material/Button';
import UserRow from './UserRow'
import { connect } from 'react-redux'

const Customers = (props) => {
    window.scrollTo(0, 0)
    return (
        <section className={styles.customerContainer}>
            <div className={styles.infoTable}>
                <div className={styles.tableHeader}>
                    <h2>Clientes</h2>
                    <Button variant="contained" color="info" size="medium" onClick={() => alert('hola')}><MdPersonAdd />Agregar</Button>
                </div>
                <hr />
                <div className={styles.tableContainer}>
                    <table className={styles.customersTable}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Pedidos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.map(user => <UserRow user={user} key={user._id} />)}
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = state => {
    return {
        users: state.adminUsers.users
    }
}
export default connect(mapStateToProps)(Customers)