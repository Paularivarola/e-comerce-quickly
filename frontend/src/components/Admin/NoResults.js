import styles from '../../styles/noresult.module.css'
const NoResults = () => {
    return (
        <div className={styles.container}>
            <p>No hay resultados para esta búsqueda</p>
            <p>Intente con otro término</p>
        </div>
    )
}

export default NoResults