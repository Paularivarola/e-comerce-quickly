import { Bar } from 'react-chartjs-2'
import styles from '../../styles/dashboard.module.css'

const Visits = () => {
    const data = {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [{
            label: 'Habitantes',
            backgroundColor: '#FE6849',
            borderColor: 'black',
            borderWidth: 1,
            hoverBrackgroundColor: 'blue',
            hoverBorderColor: 'orange',
            data: [125, 145, 354, 274, 325, 257, 158]
        }],
        borderWidth: 5,
        borderColor: 'red'
    }
    const options = {
        mantainAspectRatio: false,
        responsive: true,

    }
    return (
        <div style={{ width: '100%', padding: '0 5px' }} className={styles.graph}>
            <Bar data={data} options={options} />
        </div>
    )
}

export default Visits