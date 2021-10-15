import styles from '../../styles/customer.module.css'
import { MdDelete, MdInfoOutline } from "react-icons/md";
import * as React from 'react';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import adminUsersActions from '../../redux/actions/admin/adminUserActions';
import Swal from 'sweetalert2'
import { message } from './Message';
import { useState } from 'react'
import { Link } from 'react-router-dom'


const UserRow = (props) => {
    const { render, setRender } = props
    const [details, setDetails] = useState(false)
    let { firstName, lastName, email } = props.user.data
    const { _id } = props.user
    firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase()
    lastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()
    const fullName = firstName + " " + lastName
    let img = props.user
        ? props.user.data.google || props.user.data.admin.flag
            ? props.user.data.src
            : props.user.data.src !== 'assets/user.png'
                ? 'https://quickly-food.herokuapp.com/' + props.user.data.src
                : '/assets/user.png'
        : '/assets/user.png'

    const verification = (id) => {
        Swal.fire({
            title: '¿Desea borrar al usuario?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await props.deleteUser(id)
                    if (response.success) {
                        message('success', 'Usuario eliminado exitosamente.')
                        setRender(!render)
                    }
                } catch (error) {
                    message('error', 'Surgió un problema. Intente más tarde.')
                }
            }
        })
    }
    return (
        <>
            <tr>
                <td>
                    <div className={styles.profilePic} style={{
                        backgroundImage: `url("${img}")`
                    }}></div>
                </td>
                <td>{fullName}</td>
                <td>{email}</td>
                <td>{props.user.data.admin.flag ? 'Administrador' : 'Cliente'}</td>
                <td className={styles.buttonsSection}>
                    <Button variant="contained" color="info" size="small" onClick={() => props.setChosen(props.user)}><MdInfoOutline />Más Info</Button>
                    <Button onClick={() => verification(_id)} variant="outlined" color="error" size="small"><MdDelete />Borrar</Button>
                </td>
            </tr>
        </>
    )
}
const mapDispatchToProps = {
    deleteUser: adminUsersActions.deleteUser
}

export default connect(null, mapDispatchToProps)(UserRow)