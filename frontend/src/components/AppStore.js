import styles from '../styles/appStore.module.css'

const AppStore = () => {
    return (
        <div className={styles.mainApp}>
            <div className={styles.descriptionBox}>
                <div className={styles.titleBox}>
                    <h3 className={styles.title}>Descargate LDC App</h3>
                    <p className={styles.text}>Ahora podés realizar tus pedidos por la app, nosotros lo preparamos y te lo llevamos a tu mesa. Además vas a tener todas nuestros promos al alcance de tu mano. Con miCocina App comé fácil, rápido y rico!</p>
                </div>
                <div className={styles.sistemBox}>
                    <div className={styles.sistemContainer}>
                        <div className={styles.sistem}>
                            <img className={styles.pictureSistem} src='https://i.postimg.cc/FR8fVBqf/android.png' alt='android'/>
                            <p className={styles.textSistem}>Disponible en android</p>
                        </div>
                        <div className={styles.sistem}>
                            <img className={styles.pictureSistem} src='https://i.postimg.cc/8kLkYcfX/ios.png' alt='iphone'/>
                            <p className={styles.textSistem}>Disponible en iphone</p>
                        </div>
                    </div>
                    <img className={styles.picture} src='https://i.postimg.cc/Pr4wB2v7/qr.png' alt='qr'/>
                </div>
            </div>
            <img className={styles.picture} src='https://i.postimg.cc/sXsyd9hn/appphone.png' alt='phone'/>
        </div>
    )
}

export default AppStore