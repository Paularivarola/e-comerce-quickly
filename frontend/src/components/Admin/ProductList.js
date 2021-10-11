import styles from '../../styles/customer.module.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import adminProductActions from '../../redux/actions/admin/adminProductActions';
import { message } from './Message';

const ProductList = (props) => {
    const { name, price, category, stock, _id, img } = props.product


    const deleteProduct = async (id) => {
        try {
            let response = await props.deleteProduct(id)
            if (response.success) {
                message('success', 'Producto eliminado exitosamente.')
            }
        } catch (error) {
            message('error', 'Surgió un problema. Intente más tarde.')
        }
    }

    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });

    const verification = (id) => {
        Swal.fire({
            title: '¿Desea borrar el producto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
            }
        })
    }

    return (
        <tr>
            <td style={{ width: '15%' }}>
                <div className={styles.profilePic} style={{ backgroundImage: `url('http://localhost:4000/products/${img}')` }}></div>
            </td>
            <td style={{ width: '30%' }}>{name}</td>
            <td style={{ width: '20%' }}>{category}</td>
            <td style={{ width: '10%' }}>{formatter.format(price)}</td>
            <td style={{ width: '10%' }}>{stock}</td>
            <td className={styles.buttonsSection}>
                <Link to={`/admin/productos/editar/${_id}`}><Button variant="contained" color="info" size="small" onClick={() => props.setView('Editar Producto')}><MdEdit />Editar</Button></Link>
                <Button variant="outlined" color="error" size="small" onClick={() => verification(_id)} ><MdDelete />Borrar</Button>
            </td>
        </tr >
    )
}
const mapDispatchToProps = {
    deleteProduct: adminProductActions.deleteProduct
}
export default connect(null, mapDispatchToProps)(ProductList)