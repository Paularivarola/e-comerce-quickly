import styles from '../../styles/dashboard.module.css'
import { Pie } from 'react-chartjs-2'
const OrdersHistory = (props) => {
    let pendientes = props.orders.filter(order => order.status === 'Pendiente').length
    let entregado = props.orders.filter(order => order.status === 'Entregado').length
    let cancelado = props.orders.filter(order => order.status === 'Cancelado').length
    let preparacion = props.orders.filter(order => order.status === 'En preparación').length
    let camino = props.orders.filter(order => order.status === 'En camino').length
    const data = {
        labels: [
            'Pendiente',
            'Entregado',
            'Cancelado',
            'En preparación',
            'En camino'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [pendientes, entregado, cancelado, preparacion, camino],
            backgroundColor: [
                '#FE6849',
                '#cf543b',
                '#a1412e',
                '#793022',
                '#4d1c12'

            ],
            hoverOffset: 4
        }]
    };
    const options = {
        mantainAspectRatio: true,
        responsive: true,
    }
    return (
        <div style={{ width: '100%', padding: '0 15%' }}>
            <div style={{ width: '100%', padding: '0 5px' }} className={styles.circleGraph}>
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default OrdersHistory