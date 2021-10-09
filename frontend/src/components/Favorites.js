import styles from '../styles/products.module.css'
import styles2 from '../styles/productCard.module.css'
import styles3 from '../styles/profile.module.css'

import ProductCard from './ProductCard'
import Product from './Product'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productActions'
import userActions from '../redux/actions/userActions'

const Favorites = ({ userData, products }) => {
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
        <p className={styles3.fovouritesTitle}>
          ¡Estos son tus platos favoritos!
        </p>
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
        {products
          .filter((prod) => prod.favs.includes(userData._id))
          .map((prod, index) => (
            <ProductCard
              product={prod}
              key={'product' + index}
              setModal={setModal}
            />
          ))}
        {mod && <Product product={product} setMod={setMod} />}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    products: state.products.products,
  }
}
const mapDispatchToProps = {
  getProducts: productActions.getProducts,
  updateUser: userActions.updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
