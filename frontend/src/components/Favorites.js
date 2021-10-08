import styles from '../styles/products.module.css'
import styles2 from '../styles/productCard.module.css'
import styles3 from '../styles/profile.module.css'

import ProductCard from './ProductCard'
import Product from './Product'
import { useEffect, useState } from 'react'

const Favorites = ({ favorites, user }) => {
  const [mod, setMod] = useState(false)
  const [product, setProduct] = useState(null)

  const setModal = (bool, product) => {
    setMod(bool)
    setProduct(product)
  }
  window.onclick = (e) => {
    if (e.target.dataset.modal === 'closeModal') setMod(false)
  }

  useEffect(() => {
    if (mod) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      document.getElementsByTagName('body')[0].style.height = '100vh'
    } else {
      document.getElementsByTagName('body')[0].style = ''
    }
  }, [mod])
  return (
    <div className={styles.gridBox}>
      <div className={styles3.boxFav}>
          <p className={styles3.fovouritesTitle}>¡Estos son tus platos favoritos!</p>
          <img src='https://i.postimg.cc/B6TqCZmN/compufav.png' alt='imgFav' />
      </div>

      {/* ----- este div de abajo va en un condicional (cuando no haya platos favoritos seleccionados) ------ */}

      {/* <div className={styles3.boxNoFav}>
          <p className={styles3.noFavouritesTitle}>Acá vas a poder ver tus platos favoritos</p>
          <img src='https://i.postimg.cc/B6TqCZmN/compufav.png' alt='imgFav' />
      </div> */}

      <div className={styles2.products}>
        {/* {favorites?.map((prod, index) => (
          <ProductCard product={prod} key={'product' + index} setModal={setModal} />
        ))}
        {mod && <Product product={product} setMod={setMod} />} */}

        {/* ----- este solo lo puse para probar cuando haya cards de favoritos ------ */}
        {products.map((prod, index) => (
              <ProductCard product={prod} key={'product' + index} setModal={setModal} />
            ))}
            {mod && <Product product={product} setMod={setMod} />}
      </div>
    </div>
  )
}

export default Favorites

let products = [
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: 100,
    ingredients: 'jamon, tomate, muzzarella',
    stock: 5,
  },
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: 100,
    ingredients: 'jamon, tomate, muzzarella',
    stock: 5,
  },
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: 100,
    ingredients: 'jamon, tomate, muzzarella',
    stock: 5,
  },
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: 100,
    ingredients: 'jamon, tomate, muzzarella',
    stock: 5,
  },
  {
    img: '/assets/pizzas.jpeg',
    name: 'nombre producto',
    category: 'categoria',
    description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
    price: 100,
    ingredients: 'jamon, tomate, muzzarella',
    stock: 5,
  },
]

products = [...products, ...products,]