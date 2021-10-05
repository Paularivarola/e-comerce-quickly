import styles from '../styles/hero.module.css'
import { NavLink } from 'react-router-dom'

const Hero = () => {
    return (
        <div className={styles.heroContainer}>
            <div className={styles.boxCall}>
                <h1 className={styles.heroH1}>Si tenés <span className={styles.spanRed}>miCocina,</span> tenés <span className={styles.spanGrey}>todo.</span></h1>
                <h3 className={styles.heroH3}>Disfrutá tu comida favorita desde la comodidad de tu casa.</h3>
                <h4 className={styles.heroH4}>Vos pedis y nosotros nos encargamos del resto!</h4>
                <NavLink to='/' className={styles.button}>Ver más categorias</NavLink>
            </div>
            <div className={styles.categoriesBox}>
                <div className={styles.categoriesRow}>
                    <NavLink to='/' className={styles.categoryBox}>
                        <img src='https://i.postimg.cc/pr9w1gTY/hamburguesas.webp' alt='hamburguesas'/>
                        <p>categoria + flecha</p>
                    </NavLink>
                    <NavLink to='/' className={styles.categoryBox}>
                        <img src='https://i.postimg.cc/13zjWkjg/pizza.webp' alt='pizzas'/>
                        <p>categoria + flecha</p>
                    </NavLink>
                </div>
                <div className={styles.categoriesRow}>
                    <NavLink to='/' className={styles.categoryBox}>
                        <img src='https://i.postimg.cc/wTwWsWj9/saludable.webp' alt='saludable'/>
                        <p>categoria + flecha</p>
                    </NavLink>
                    <NavLink to='/' className={styles.categoryBox}>
                        <img src='https://i.postimg.cc/HsdnRzHD/milanesas.webp' alt='minutas'/>
                        <p>categoria + flecha</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Hero