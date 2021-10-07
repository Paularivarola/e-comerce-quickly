import ProductCard from '../components/ProductCard'
import styles from '../styles/products.module.css'
import styles2 from '../styles/productCard.module.css'
import { BiCategory } from 'react-icons/bi'
import { MdShoppingCart } from 'react-icons/md'
import { connect } from 'react-redux'
import { BsFillCaretRightFill } from 'react-icons/bs'
import Product from '../components/Product'
import { useState } from 'react'

const Products = (props) => {
  const [mod, setMod] = useState(false)
  const [product, setProduct] = useState(null)

  const setModal = (bool, product) => {
    setMod(bool)
    setProduct(product)
  }
  window.onclick = (e) => {
    if (e.target.dataset.modal === 'closeModal') setMod(false)
  }
  return (
    <div className={styles.mainProducts}>
      <div className={styles.categories}>
        <div className={styles.categoriesList}>
          <BiCategory style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }} />
          <p className={styles.categoriesTitle}> Categorias</p>
        </div>
        <div className={styles.boxShop}>
          <p className={styles.welcome}>Hola {props.user && props.user.firstName}! ¿Qué vas a comer hoy?</p>
          <button className={styles.carritoBtn}>
            <MdShoppingCart style={{ color: 'white', fontSize: '1.8em', marginRight: '5%' }} /> Carrito
          </button>
        </div>
      </div>
      <div className={styles.productsGrid}>
        <div className={styles.listBox}>
          <button className={styles.categoryBtn}>
            <p>Categorias</p>
            <BsFillCaretRightFill style={{ color: '#fe6849', fontSize: '1.8em' }} />
          </button>
          <button className={styles.categoryBtn}>
            <p>Categorias</p>
            <BsFillCaretRightFill style={{ color: '#fe6849', fontSize: '1.8em' }} />
          </button>
          <button className={styles.categoryBtn}>
            <p>Categorias</p>
            <BsFillCaretRightFill style={{ color: '#fe6849', fontSize: '1.8em' }} />
          </button>
          <button className={styles.categoryBtn}>
            <p>Categorias</p>
            <BsFillCaretRightFill style={{ color: '#fe6849', fontSize: '1.8em' }} />
          </button>
          <button className={styles.categoryBtn}>
            <p>Categorias</p>
            <BsFillCaretRightFill style={{ color: '#fe6849', fontSize: '1.8em' }} />
          </button>
          <button className={styles.categoryBtn}>
            <p>Categorias</p>
            <BsFillCaretRightFill style={{ color: '#fe6849', fontSize: '1.8em' }} />
          </button>
          <button className={styles.categoryBtn}>
            <p>Categorias</p>
            <BsFillCaretRightFill style={{ color: '#fe6849', fontSize: '1.8em' }} />
          </button>
          <button className={styles.categoryBtn}>
            <p>Categorias</p>
            <BsFillCaretRightFill style={{ color: '#fe6849', fontSize: '1.8em' }} />
          </button>
        </div>
        <div className={styles.gridBox}>
          <div className={styles2.products}>
            {products.map((prod, index) => (
              <ProductCard product={prod} key={'product' + index} setModal={setModal} />
            ))}
            {mod && <Product product={product} setMod={setMod} />}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}

export default connect(mapStateToProps)(Products)

let products = [
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: '100',
    ingredients: 'jamon, tomate, muzzarella',
    stock: 'ni idea',
  },
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: '100',
    ingredients: 'jamon, tomate, muzzarella',
    stock: 'ni idea',
  },
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: '100',
    ingredients: 'jamon, tomate, muzzarella',
    stock: 'ni idea',
  },
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: '100',
    ingredients: 'jamon, tomate, muzzarella',
    stock: 'ni idea',
  },
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: '100',
    ingredients: 'jamon, tomate, muzzarella',
    stock: 'ni idea',
  },
]

products = [...products, ...products, ...products, ...products, ...products, ...products]
