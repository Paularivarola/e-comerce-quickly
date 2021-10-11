import styles from '../../styles/customerdetails.module.css'
import { MdOutlineInfo } from "react-icons/md";

const ProfileOrders = (props) => {
    return (
        <div className={styles.ordersContainer}>
            {!props.user.ordersId.length &&
                <span className={styles.warning}><MdOutlineInfo />El usuario no ha realizado pedidos aún.</span>}
        </div>
    )
}
export default ProfileOrders