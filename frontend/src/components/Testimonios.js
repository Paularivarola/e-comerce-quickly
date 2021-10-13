import styles from '../styles/testimonios.module.css'

const Testimonios = () => {
    const testimonies = [
        {
            userImg: 'https://i.postimg.cc/fRnR9n7q/opinion1.jpg',
            name: 'Agustina López',
            description: 'Excelente como siempre. Extensa carta, buenos platos, para todos los gustos. Muy buena atencion y tiempos.',
        },
        {
            userImg: 'https://i.postimg.cc/sxG3MwMR/chico.jpg',
            name: 'Carlos Gómez',
            description: 'La comida es muy rica. Los precios son acordes. También nos atendieron muy bien. Así que todo de 10',
        },
        {
            userImg: 'https://i.postimg.cc/Gmd9fnB8/opinion2.jpg',
            name: 'Natalie Esperante',
            description: 'Muy buen lugar, muy buenos platos, excelente carta de vinos.Están en todos los detalles, super recomendable'
        },
    ]

   
    return (
        <>
            <div className={styles.textTestimony}>
                <p className={styles.title1}>Ya todos usan Quickly</p>
                <p className={styles.title2}>Testimonios</p>
            </div>
            <div className={styles.mainTestimony}>
                {testimonies.map((testimony, index) => {
                    return (
                        <div className={styles.cardTestimony} key={index}>
                            <div className={styles.boxTestimony}>
                                <div className={styles.circle} style={{ backgroundImage: `url("${testimony.userImg}")` }}></div>
                            </div>
                            <p className={styles.descriptionTestimony}>{testimony.description}</p>
                            <p className={styles.nameTestimony}>{testimony.name}</p>
                        </div>
                        )
                })}
            </div>
        </>
    )
}

export default Testimonios