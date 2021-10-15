import Button from '@mui/material/Button';
import { MdInfoOutline } from "react-icons/md";
const OrderRow = (props) => {

    const { date, userId, purchased, status } = props.order
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
        <>
            <tr>
                <td>{orderDate}</td>
                <td>{userId.data.firstName} {userId.data.lastName}</td>
                <td>{formatter.format(subTotal)}</td>
                <td>{status}</td>
                <td>
                    <Button variant="contained" color="info" size="small" onClick={() => props.setChosen(props.order)} ><MdInfoOutline />Más Info</Button>
                </td>
            </tr>
        </>
    )
}
export default OrderRow