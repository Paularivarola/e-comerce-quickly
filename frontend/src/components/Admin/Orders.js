import * as React from 'react';
import styles2 from '../../styles/customer.module.css'
import { connect } from 'react-redux'
import adminOrderActions from '../../redux/actions/admin/adminOrderActions';

const Order = (props) => {
    const { userId, _id, status } = props.order
    return (
        <tr>
            <td>{_id}</td>
            <td>{userId.data.firstName} {userId.data.lastName}</td>
            <td>
                <select name='status' defaultValue={status} onChange={(e) => props.updateOrder(e.target.value, _id)}>
                    <option value='Pendiente'>Pendiente</option>
                    <option value='En preparación'>En preparación</option>
                    <option value='En camino'>En camino</option>
                    <option value='Cancelado'>Cancelado</option>
                    <option value='Entregado'>Entregado</option>
                </select>
            </td>
        </tr >
    );
}

const mapDispatchToProps = {
    updateOrder: adminOrderActions.updateOrder
}

export default connect(null, mapDispatchToProps)(Order)