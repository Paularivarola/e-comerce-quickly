import React, { useState, useEffect } from 'react'
import styles from '../styles/productCard.module.css'
import { MdShoppingCart } from 'react-icons/md'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import CardTost from './CardTost'

const ProductCard = ({ product, setModal, user, userData, favHandler }) => {
  const [stopper, setStopper] = useState(true)
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    setLiked(product?.favs?.includes(userData?._id))
    // eslint-disable-next-line
  }, [userData, product])

  const [cardTost, setCardTost] = useState({
    time: '',
    icon: '',
    text: '',
    view: false,
  })

  const favClickHandler = async (action, _id) => {
    if (!stopper) {
      return false
    }
    if (!user) {
      setCardTost({
        time: 1500,
        icon: 'error',
        text: 'Inicia Sesión para agregar a fav',
        view: true,
      })
      return false
    }
    setStopper(false)

    let response = await favHandler({ action, _id })

    if (response) {
      if (action === 'addFav') {
        setLiked(true)
      } else {
        setLiked(false)
      }
      setStopper(true)
    }
  }
  return (
    <div className={styles.product} id={product._id}>
      {cardTost.view && <CardTost properties={cardTost} setCardTost={setCardTost} />}

      <div className={styles.productBox}>
        <div className={styles.productImg} style={{ backgroundImage: `url("https://quickly-food.herokuapp.com${product.img}")` }}>
          {!liked ? (
            <BsBookmarkStar className={styles.fav} onClick={() => favClickHandler('addFav', product._id)} />
          ) : (
            <BsBookmarkStarFill className={styles.fav} onClick={() => favClickHandler('deleteFav', product._id)} />
          )}
        </div>
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
          <Stack spacing={1}>
            {!user ? (
              <Rating name='half-rating-read' defaultValue={product.score} precision={0.1} readOnly />
            ) : (
              <Rating
                className={styles.rating}
                style={{ backgroundColor: 'yelow' }}
                name='half-rating'
                defaultValue={product.score}
                precision={0.1}
              />
            )}
          </Stack>
        </div>
      </div>
      <button data-modal='productModal' className={styles.addBtn} onClick={() => setModal(true, product)}>
        <MdShoppingCart style={{ color: 'white', fontSize: '1.8em', marginRight: '5%' }} /> +
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    userData: state.users.userData,
  }
}
const mapDispatchToProps = {
  favHandler: userActions.favHandler,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
