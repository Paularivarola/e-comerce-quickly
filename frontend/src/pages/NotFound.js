import styles from '../styles/notFound.module.css'

const NotFound = () => {
    return (
        <main className={styles.main}>
            <img className={styles.img} src="assets/error.jpg"/>
            <p>parece que te has perdido! Te ayudamos a volver :)</p>
        </main>
    )
}

export default NotFound