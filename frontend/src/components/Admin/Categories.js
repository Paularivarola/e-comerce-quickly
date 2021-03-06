import styles from '../../styles/dashboard.module.css'
import { Pie } from 'react-chartjs-2'
const Categories = (props) => {

    let catList = []
    let repeatedCat = []
    let figures = []

    props.products.map(product => {
        if (!catList.includes(product.category)) {
            catList.push(product.category)
        }
        return repeatedCat.push(product.category)
    })

    catList.map(category => {
        return figures.push(repeatedCat.filter(cat => cat === category).length)
    })

    const data = {
        labels: catList,
        datasets: [{
            label: 'My First Dataset',
            data: figures,
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
            <div style={{ width: '100%', padding: '0 5px' }} className={styles.circleGraph} >
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default Categories