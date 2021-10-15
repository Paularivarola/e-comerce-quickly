import styles from '../../styles/customerdetails.module.css'
import { MdOutlineInfo } from "react-icons/md";

const PersonalData = (props) => {
    const { firstName, lastName, email, google } = props.user.data
    let img = props.user
        ? props.user.data.google || props.user.data.admin.flag
            ? props.user.data.src
            : props.user.data.src !== 'assets/user.png'
                ? 'https://quickly-food.herokuapp.com/' + props.user.data.src
                : '/assets/user.png'
        : '/assets/user.png'

    const fullName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() + " " + lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()

    return (
        <div className={styles.dataContainer}>
            <div className={styles.userImage} style={{ backgroundImage: `url("${img}")` }}></div>
            <div className={styles.information}>
                <h2>Datos Personales</h2>
                <h3>Nombre: <span>{fullName}</span></h3>
                <h3>Correo: <span>{email}</span></h3>
                <h3>¿Registrado con Google?: <span>{google ? 'Sí' : 'No'}</span></h3>
                <h2>Direcciones</h2>
                {!props?.user?.addresses?.length ?
                    <div>
                        <span className={styles.warning}><MdOutlineInfo />El usuario no ha ingresado ninguna dirección.</span>
                    </div>
                    : <div className={styles.addressesContainer}>
                        {props.user.addresses.map((address, index) =>
                            <div className={styles.addressBox} key={index}>
                                <h3>Alias</h3>
                                <p>{address.alias}</p>
                                <h3>Dirección</h3>
                                <p>{address.street} {address.number}{address.apartment && `, depto ${address.apartment}`}</p>
                                <h3>Localidad</h3>
                                <p>{address.neighborhood}</p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default PersonalData