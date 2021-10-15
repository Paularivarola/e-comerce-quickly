import styles from '../../styles/orderdetails.module.css'
import { Link } from 'react-router-dom'
import { MdCancel } from "react-icons/md";

const OrderDetails = (props) => {
    const { date, purchased, status } = props.order
    let orderDate = (new Date(Date.parse(date))).toLocaleDateString()
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    })

    let subTotal = purchased.reduce((acc, order) => {
        var sub = acc + order.totalPrice + order.totalAmount * order.drink.cost + order.totalAmount * order.fries.cost
        return sub
    }, 0)

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.mainContainer}>
                <Link to='/admin/pedidos'><MdCancel onClick={() => { props.setChosen(null) }} /></Link>
                <div className={styles.information}>
                    <h2>Fecha: {orderDate}</h2>
                    <h2>Estado: {status}</h2>
                    <h2 className={styles.title}>Detalle</h2>
                    <table className={styles.orderTable}>
                        <thead>
                            <tr>
                                <th>Cant.</th>
                                <th>Producto</th>
                                <th style={{ textAlign: 'right' }}>Precio Unitario</th>
                                <th style={{ textAlign: 'right' }}>Precio Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchased.map(product =>
                                <tr key={product._id}>
                                    <td style={{ width: '10%' }}>{product.totalAmount}</td>
                                    <td style={{ width: '50%' }}>{product.productId.name}</td>
                                    <td style={{ textAlign: 'right', width: '20%' }}>{formatter.format(product.unitaryPrice)}</td>
                                    <td style={{ textAlign: 'right', width: '20%' }}>{formatter.format(product.totalPrice)}</td>
                                </tr>
                            )}
                            {purchased.map(product => {
                                if (product.drink.type !== 'Sin bebida') {
                                    return (
                                        <tr key={product._id}>
                                            <td style={{ width: '10%' }}>{product.totalAmount}</td>
                                            <td style={{ width: '50%' }}>{product.drink.type}</td>
                                            <td style={{ textAlign: 'right', width: '20%' }}>{formatter.format(product.drink.cost)}</td>
                                            <td style={{ textAlign: 'right', width: '20%' }}>{formatter.format(product.totalAmount * product.drink.cost)}</td>
                                        </tr>
                                    )
                                }
                                return true
                            }
                            )}
                            {purchased.map(product =>
                                <tr key={product._id}>
                                    <td style={{ width: '10%' }}>{product.totalAmount}</td>
                                    <td style={{ width: '50%' }}>{`Papas ${product.fries.size}`}</td>
                                    <td style={{ textAlign: 'right', width: '20%' }}>{formatter.format(product.fries.cost)}</td>
                                    <td style={{ textAlign: 'right', width: '20%' }}>{formatter.format(product.totalAmount * product.fries.cost)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.resume}>
                    <h3 style={{ marginTop: '1em', textAlign: 'right' }}>Precio Total: {formatter.format(subTotal)}</h3>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails