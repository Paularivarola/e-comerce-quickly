
import { Pie } from 'react-chartjs-2'
const OrdersHistory = () => {
    const data = {
        labels: [
            'En Proceso',
            'Terminado',
            'Cancelado'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [7, 40, 3],
            backgroundColor: [
                '#F7C017',
                '#16C60C',
                '#F03A17'
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
            <div style={{ width: '100%', padding: '0 5px' }} className='prueba2'>
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default OrdersHistory