import styles from '../styles/productCard.module.css'
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs'
import { MdShoppingCart } from 'react-icons/md'

const ProductCard = ({ product, setModal }) => {
  let star = (
    <BsStar
      style={{
        color: 'rgb(216, 205, 56)',
        fontSize: '1.3em',
        marginRight: '5%',
      }}
    />
  )
  let starHalf = (
    <BsStarHalf
      style={{
        color: 'rgb(216, 205, 56)',
        fontSize: '1.3em',
        marginRight: '5%',
      }}
    />
  )
  let starFill = (
    <BsStarFill
      style={{
        color: 'rgb(216, 205, 56)',
        fontSize: '1.3em',
        marginRight: '5%',
      }}
    />
  )

  return (
    <div className={styles.product}>
      <div className={styles.productBox}>
        <div className={styles.productImg} style={{ backgroundImage: `url("${product.img}")` }}></div>
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <div></div>
          <p className={styles.productDesc}>{product.description}</p>
          <p className={styles.productIng}>{product.ingredients}</p>
        </div>
      </div>
      <hr className={styles.line}></hr>
      <div className={styles.priceBox}>
        <p className={styles.price}>
          <span className={styles.priceTitle}>Price: </span>$ {product.price}
        </p>
        <div className={styles.calification}>
          {starFill}
          {starFill}
          {starFill}
          {starHalf}
          {star}
        </div>
      </div>
      <button id='productModal' className={styles.addBtn} onClick={() => setModal(true, product)}>
        <MdShoppingCart id='productModal' style={{ color: 'white', fontSize: '1.8em', marginRight: '5%' }} onClick={() => setModal(true, product)} /> +
      </button>
    </div>
  )
}

export default ProductCard
