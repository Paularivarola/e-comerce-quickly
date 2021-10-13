import ProductCard from '../components/ProductCard'
import styles from '../styles/products.module.css'
import styles2 from '../styles/productCard.module.css'
import { BiCategory } from 'react-icons/bi'
import { MdShoppingCart } from 'react-icons/md'
import { connect } from 'react-redux'
import Preloader from '../components/Preloader'
import Product from '../components/Product'
import { useEffect, useState } from 'react'
import productActions from '../redux/actions/productActions'
import NavLateral from '../components/NavLateral'

const Products = (props) => {
  const [mod, setMod] = useState(false)
  const [product, setProduct] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    props.getProducts()
    props.history.location.pathname === '/products' && props.history.push('/products/all')
  }, [])
  useEffect(() => {
    setProducts(
      props.products?.filter((prod) => {
        let path = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
        return path === 'all' || path === prod.category
      })
    )
  }, [window.location.pathname, props.products])

  const setModal = (bool, product) => {
    setMod(bool)
    setProduct(product)
  }

  window.onclick = (e) => {
    if (e.target.dataset.modal === 'closeModal') setMod(false)
  }

  const navItems = [
    { page: 'products', comp: 'all', name: 'todos' },
    ...props.products
      .map((prod) => prod.category)
      .filter((cat, index, array) => index === array.indexOf(cat))
      .map((cat) => {
        return { page: 'products', comp: cat, name: cat }
      }),
  ]
  return (
    <div className={styles.mainProducts}>
      <div className={styles.categories}>
        <div className={styles.categoriesList}>
          <BiCategory style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }} />
          <p className={styles.categoriesTitle}> Categorias</p>
        </div>
        <div className={styles.boxShop}>
          <p className={styles.welcome}>Hola {props.user && props.user.firstName}! ¿Qué vas a comer hoy?</p>
          <button id='cart' className={styles.carritoBtn} onClick={() => props.history.push('/cart')}>
            <span style={{ marginRight: '0.7rem', color: 'white', fontSize: '1rem' }}>{props?.cart?.length + ' '}</span>
            <MdShoppingCart style={{ color: 'white', fontSize: '1.8em', marginRight: '5%' }} /> Carrito
          </button>
        </div>
      </div>
      <div className={styles.productsGrid}>
        <NavLateral navItems={navItems} />
        <div className={styles.gridBox}>
          {products.length === 0 ? (
            <Preloader />
          ) : (
            <div className={styles2.products}>
              {products.map((prod, index) => (
                <ProductCard index={index} product={prod} key={'product' + index} setModal={setModal} />
              ))}
              {mod && <Product product={product} setMod={setMod} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    products: state.products.products,
    cart: state.users.cart,
  }
}
const mapDispatchToProps = {
  getProducts: productActions.getProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
