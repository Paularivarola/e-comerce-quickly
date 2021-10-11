import styles from '../styles/cart.module.css'
import styles2 from '../styles/products.module.css'
import { FiEdit } from 'react-icons/fi'
import { MdShoppingCart } from 'react-icons/md'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const Cart = () => {

    return (
    <div className={styles.mainCart}>
        <div className={styles2.categories}>
            <div className={styles2.categoriesList}>
                <MdShoppingCart
                style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }}
                />
                <p className={styles2.categoriesTitle}> Mi carrito</p>
            </div>
            <div className={styles.boxData}>
                <div className={styles.boxAdress}>
                    <p className={styles.adress}>
                        <span>Punto de entrega:</span> "direccion por defecto elegida"
                    </p>
                    <span className={styles.adressBtn}>
                        <FiEdit  style={{ color: '#fe6849', fontSize: '1.5em'}}/>
                    </span>
                </div>
                <div className={styles.payBtn}>
                    <p className={styles.totalPrice}><span>Precio total:</span> $ 0000</p>
                    <button>Pagar</button>
                </div>
            </div>
        </div>
        <div className={styles.boxItems}>
            <div className={styles.cartHeader}>
                <div className={styles.product}>
                    <p className={styles.headerTitle}>Pedido</p>
                </div>
                <div className={styles.quantity}>
                    <p className={styles.headerTitle}>Cantidad</p>
                </div>
                <div className={styles.itemTotalPrice}>
                    <p className={styles.headerTitle}>Total</p>
                </div>
                <div className={styles.buttons}>
                    <p className={styles.headerTitle}>Editar/eliminar</p>
                </div>
            </div>
            <div className={styles.gridBox}>
                <div className={styles.cartGrid}>
                    <div className={styles.cartItem}>
                        <div className={styles.product}>
                            <div className={styles.productImg} style={{ backgroundImage: 'url("https://sevilla.abc.es/gurme/wp-content/uploads/sites/24/2013/04/pizza-margarita.jpg")'}}></div>
                            <div className={styles.productDetails}>
                                <p className={styles.productName}>nombre del producto</p>
                                <p className={styles.unitaryPrice}>$ 0000</p>
                            </div>
                        </div>
                        <hr className={styles.line}></hr>
                        <div className={styles.quantity}>
                            <div className={styles.boxQuantity}>
                                <div className={styles.sign}><p>+</p></div>
                                <div className={styles.number}><p>20</p></div>
                                <div className={styles.sign}><p>-</p></div>
                            </div>
                        </div>
                        <hr className={styles.line}></hr>
                        <div className={styles.itemTotalPrice}>
                            <p className={styles.priceText}>$ 00000</p>
                        </div>
                        <hr className={styles.line}></hr>
                        <div className={styles.buttons}>
                            <span className={styles.span}><FiEdit style={{ color: '#fe6849', fontSize: '1.5em'}}/></span>
                            <span className={styles.span}><RiDeleteBin7Fill style={{ color: '#fe6849', fontSize: '1.5em'}}/></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Cart