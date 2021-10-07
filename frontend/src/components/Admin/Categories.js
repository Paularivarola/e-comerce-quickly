
import { Pie } from 'react-chartjs-2'
const Categories = () => {
    const data = {
        labels: [
            'Hamburguesa',
            'Pizza',
            'Sopa'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [5, 7, 4],
            backgroundColor: [
                '#F88F01',
                '#E27802',
                '#ffcd56'
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

export default Categories