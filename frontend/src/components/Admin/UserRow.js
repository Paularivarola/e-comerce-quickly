import styles from '../../styles/customer.module.css'
import { MdEdit, MdDelete, MdPersonAdd } from "react-icons/md";
import * as React from 'react';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import adminUsersActions from '../../redux/actions/admin/adminUserActions';
import Swal from 'sweetalert2'

const UserRow = (props) => {
    let { firstName, lastName, email, _id } = props.user.data
    firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase()
    lastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()
    const fullName = firstName + " " + lastName

    const verification = () => {
        Swal.fire({
            title: '¿Desea borrar al usuario?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                props.deleteUser(_id)
            }
        })
    }

    return (
        <tr>
            <td>
                <div className={styles.profilePic} style={{
                    backgroundImage: `url("${props.user
                        ? props.user.google
                            ? props.user.data.src
                            : props.user.data.src !== '/assets/user.png'
                                ? 'http://localhost:4000/' + props.user.data.src
                                : '/assets/user.png'
                        : '/assets/user.png'
                        }")`
                }}></div>
            </td>
            <td>{fullName}</td>
            <td>{email}</td>
            <td>{!props.user.ordersId.length ? 'Sin Pedidos' : 'Calcular'}</td>
            <td className={styles.buttonsSection}>
                <Button variant="contained" color="info" size="small"><MdEdit />Editar</Button>
                <Button onClick={verification} variant="outlined" color="error" size="small"><MdDelete />Borrar</Button>
            </td>
        </tr>
    )
}
const mapDispatchToProps = {
    deleteUser: adminUsersActions.deleteUser
}

export default connect(null, mapDispatchToProps)(UserRow)