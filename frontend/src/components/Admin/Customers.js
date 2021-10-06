import styles from '../../styles/customer.module.css'
import { MdEdit, MdDelete } from "react-icons/md";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Customers = () => {
    return (
        <section className={styles.customerContainer}>
            <div className={styles.infoTable}>
                <div className={styles.tableHeader}>
                    <h2>Clientes</h2>
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
                            <tr>
                                <td>
                                    <div className={styles.profilePic} style={{ backgroundImage: "url('https://www.tsensor.online/wp-content/uploads/2020/04/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png')" }}></div>
                                </td>
                                <td>Daniel Sepúlveda</td>
                                <td>d.sepulveda.perez@gmail.com</td>
                                <td></td>
                                <td>
                                    <Button variant="contained" color="info" size="small"><MdEdit />Editar</Button>
                                    <Button variant="outlined" color="error" size="small"><MdEdit />Borrar</Button>
                                </td>
                            </tr>
                        </tbody>
                        <tfooter>

                        </tfooter>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Customers