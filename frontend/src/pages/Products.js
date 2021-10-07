import ProductCard from '../components/ProductCard'
import styles from '../styles/products.module.css'
import { BiCategory } from "react-icons/bi"
import { MdShoppingCart } from "react-icons/md"
import { connect } from "react-redux";
import { BsFillCaretRightFill } from "react-icons/bs"

const Products = (props) => {
    console.log(props)

    return (
        <div className={styles.mainProducts}>
            <div className={styles.categories}>
                <div className={styles.categoriesList}>
                    <BiCategory style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }}/><p className={styles.categoriesTitle}> Categorias</p>
                </div>
                <div className={styles.boxShop}>
                    <p className={styles.welcome}>Hola {props.user && props.user.firstName}! ¿Qué vas a comer hoy?</p>
                    <button className={styles.carritoBtn}>
                        <MdShoppingCart style={{ color: 'white', fontSize: '1.8em', marginRight: '5%' }}/> Carrito
                    </button>
                </div>
            </div>
            <div className={styles.productsGrid}>
                <div className={styles.listBox}>
                    <button className={styles.categoryBtn}><p>Categorias</p><BsFillCaretRightFill /></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                    <button className={styles.categoryBtn}><p>Categorias</p></button>
                </div>
                <div className={styles.gridBox}>
                    <ProductCard/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
    }
}

export default connect(mapStateToProps)(Products)