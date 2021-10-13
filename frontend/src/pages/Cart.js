import styles from '../styles/cart.module.css'
import styles2 from '../styles/products.module.css'
import { FiEdit } from 'react-icons/fi'
import { MdShoppingCart } from 'react-icons/md'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
// import toastConfirm from '../components/ToastConfirm'
import Product from '../components/Product'
import CardTost from '../components/CardTost'

const CartItem = ({ cartItem, manageCart, userData, setEdit, setCartItem, index, ...props }) => {
  let initialCardTost = {
    time: '',
    icon: '',
    text: '',
    view: false,
    tost: '',
  }
  let [cardTost, setCardTost] = useState(initialCardTost)

  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.product}>
          <div
            className={styles.productImg}
            style={{
              backgroundImage: `url("${cartItem?.productId?.img}")`,
            }}
          ></div>
          <div className={styles.productDetails}>
            <p className={styles.productName}>{cartItem?.productId?.name}</p>
            <p className={styles.unitaryPrice}>$ {cartItem?.unitaryPrice}</p>
          </div>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.quantity}>
          <div className={styles.boxQuantity}>
            <p className={styles.productName}>{cartItem?.totalAmount}</p>
          </div>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.itemTotalPrice}>
          <p className={styles.priceText}>$ {cartItem?.totalPrice}</p>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.buttons}>
          <span
            className={styles.span}
            onClick={() => {
              setCartItem(cartItem)
              setEdit(true)
            }}
          >
            {userData && <FiEdit style={{ color: '#fe6849', fontSize: '1.5em' }} />}
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setCardTost({
                time: 10000,
                icon: 'error',
                text: 'No podras revertir estos cambios',
                view: true,
                tost: 'accept',
                question: '¿Borrar?',
              })
            }
          >
            {cardTost.view && (
              <CardTost
                properties={cardTost}
                setCardTost={setCardTost}
                accept={() =>
                  manageCart(userData ? { action: 'delete', cartItem, _id: userData._id } : { action: 'deleteLS', index })
                }
                deny={() => setCardTost(initialCardTost)}
              />
            )}
            <RiDeleteBin7Fill style={{ color: '#fe6849', fontSize: '1.5em' }} />
          </span>
        </div>
      </div>
    </>
  )
}

const Cart = ({ manageCart, userData, ...props }) => {
  const [edit, setEdit] = useState(false)
  const [cartItem, setCartItem] = useState({})
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')))
  }, [props.cart])
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'ARS',
  })

  let initialCardTost = {
    time: '',
    icon: '',
    text: '',
    view: false,
    tost: '',
  }
  let [cardTost, setCardTost] = useState(initialCardTost)
  const amount = cart.reduce((acc, item) => acc + item.totalPrice, 0)
  let address = userData
    ? userData?.addresses[0]?.street + ` ` + userData?.addresses[0]?.number + ' ' + userData?.addresses[0]?.apartment
    : null
  return (
    <div className={styles.mainCart}>
      <div className={styles2.categories}>
        <div className={styles2.categoriesList}>
          <MdShoppingCart style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }} />
          <p className={styles2.categoriesTitle}> Mi carrito</p>
        </div>
        <div className={styles.boxData}>
          <div className={styles.boxAdress}>
            <p className={styles.adress}>
              <span>Punto de entrega:</span> {address || '-'}
            </p>
            {userData && (
              <span className={styles.adressBtn}>
                <FiEdit style={{ color: '#fe6849', fontSize: '1.5em' }} />
              </span>
            )}
          </div>
          <div className={styles.payBtn}>
            <p className={styles.totalPrice}>
              <span>Precio total:</span> $ {formatter.format(amount)}
            </p>
            <button
              id='checkout'
              onClick={() =>
                userData && cart?.length
                  ? props.history.push('/checkout/order')
                  : !cart?.length
                  ? setCardTost({
                      time: 4000,
                      icon: 'error',
                      text: 'No has ingresado nada al carrito',
                      view: true,
                    })
                  : setCardTost({
                      time: 10000,
                      icon: 'error',
                      text: 'Debes iniciar sesión para pagar',
                      view: true,
                      tost: 'accept',
                      question: '¿Ir a Iniciar Sesión?',
                    })
              }
            >
              Pagar
            </button>
            {cardTost.view && (
              <CardTost
                properties={cardTost}
                setCardTost={setCardTost}
                accept={() => props.history.push('/sign-forms/signin')}
                deny={() => setCardTost(initialCardTost)}
              />
            )}
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
            {cart?.map((cartItem, index) => (
              <CartItem
                index={index}
                key={cartItem._id}
                cartItem={cartItem}
                manageCart={manageCart}
                userData={userData}
                setEdit={setEdit}
                setCartItem={setCartItem}
                setCardTost={setCardTost}
              />
            ))}
            {!cart?.length && <p className={styles.productName}>No tenés nada en el carrito, vuelve y encuentra algo para tí!</p>}
          </div>
        </div>
      </div>
      {edit && <Product product={cartItem.productId} editCartItem={cartItem} setMod={setEdit} edit={edit} />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    cart: state.users.cart,
  }
}

const mapDispatchToProps = {
  manageCart: userActions.manageCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
