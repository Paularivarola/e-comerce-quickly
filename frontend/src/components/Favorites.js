import styles from '../styles/products.module.css'
import styles2 from '../styles/productCard.module.css'
import ProductCard from './ProductCard'
import Product from './Product'
import { useEffect, useState } from 'react'

const Favorites = ({ favorites }) => {
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
      <div className={styles2.products}>
        {favorites?.map((prod, index) => (
          <ProductCard product={prod} key={'product' + index} setModal={setModal} />
        ))}
        {mod && <Product product={product} setMod={setMod} />}
      </div>
    </div>
  )
}

export default Favorites
