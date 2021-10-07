import styles from '../../styles/customer.module.css'
import { MdEdit, MdDelete } from "react-icons/md";
import * as React from 'react';
import Button from '@mui/material/Button';

const Products = () => {
    window.scrollTo(0, 0)
    return (
        <section className={styles.customerContainer}>
            <div className={styles.infoTable}>
                <div className={styles.tableHeader}>
                    <h2>Productos</h2>
                    <Button variant="contained" color="info" size="medium" onClick={() => alert('hola')}><MdEdit />Agregar</Button>

                </div>
                <hr />
                <div className={styles.tableContainer}>
                    <table className={styles.customersTable}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className={styles.profilePic} style={{ backgroundImage: "url('https://www.tsensor.online/wp-content/uploads/2020/04/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png')" }}></div>
                                </td>
                                <td>Daniel Sepúlveda</td>
                                <td>dsadsa</td>
                                <td>d.sepulveda.perez@gmail.com</td>
                                <td>25</td>
                                <td className={styles.buttonsSection}>
                                    <Button variant="contained" color="info" size="small"><MdEdit />Editar</Button>
                                    <Button variant="outlined" color="error" size="small"><MdDelete />Borrar</Button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Products