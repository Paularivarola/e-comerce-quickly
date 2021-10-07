import styles from '../../styles/dashboard.module.css'
import { Link } from 'react-router-dom'
const DashboardCard = (props) => {
    const { title, qty, route } = props.data
    return (
        <div className={styles.resumeBox}>
            <div className={props.color}>{props.icon}</div>
            <div className={styles.data}>
                <p>{title}</p>
                <Link to={`/admin/${route}`}><span onClick={() => props.setView(props.view)}>{qty}</span></Link>
            </div>
        </div>
    )
}
export default DashboardCard