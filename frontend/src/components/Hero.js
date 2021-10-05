import styles from '../styles/hero.module.css'
import { NavLink } from 'react-router-dom'

const Hero = () => {
    return (
        <div class={styles.heroContainer}>
            <div class={styles.boxCall}>
                <h1 class={styles.heroH1}>Si tenés <span class={styles.spanRed}>miCocina,</span> tenés <span class={styles.spanGrey}>todo.</span></h1>
                <h3 class={styles.heroH3}>Disfrutá tu comida favorita desde la comodidad de tu casa.</h3>
                <h4 class={styles.heroH4}>Vos pedis y nosotros nos encargamos del resto!</h4>
                <NavLink to='/' class={styles.button}>Ver más categorias</NavLink>
            </div>
            <div class={styles.categoriesBox}>
                <div class={styles.categoriesRow}>
                    <NavLink to='/' class={styles.categoryBox}>
                        <img src='https://i.postimg.cc/pr9w1gTY/hamburguesas.webp' alt='hamburguesas'/>
                        <p>categoria + flecha</p>
                    </NavLink>
                    <NavLink to='/' class={styles.categoryBox}>
                        <img src='https://i.postimg.cc/13zjWkjg/pizza.webp' alt='pizzas'/>
                        <p>categoria + flecha</p>
                    </NavLink>
                </div>
                <div class={styles.categoriesRow}>
                    <NavLink to='/' class={styles.categoryBox}>
                        <img src='https://i.postimg.cc/wTwWsWj9/saludable.webp' alt='saludable'/>
                        <p>categoria + flecha</p>
                    </NavLink>
                    <NavLink to='/' class={styles.categoryBox}>
                        <img src='https://i.postimg.cc/HsdnRzHD/milanesas.webp' alt='minutas'/>
                        <p>categoria + flecha</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Hero