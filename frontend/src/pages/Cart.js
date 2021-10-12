import styles from '../styles/cart.module.css'
import styles2 from '../styles/products.module.css'
import { FiEdit } from 'react-icons/fi'
import { MdShoppingCart } from 'react-icons/md'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import toastConfirm from '../components/ToastConfirm'
import { Toaster } from 'react-hot-toast'
import Product from '../components/Product'
import productActions from '../redux/actions/productActions'

const CartItem = ({ cartItem, manageCart, userData, setEdit, setCartItem }) => {
  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.product}>
          <div
            className={styles.productImg}
            style={{
              backgroundImage: 'url("https://sevilla.abc.es/gurme/wp-content/uploads/sites/24/2013/04/pizza-margarita.jpg")',
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
            <FiEdit style={{ color: '#fe6849', fontSize: '1.5em' }} />
          </span>
          <span onClick={() => toastConfirm(() => manageCart({ action: 'delete', cartItem, _id: userData._id }))} className={styles.span}>
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
  const cart = JSON.parse(localStorage.getItem('cart'))
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'ARS',
  })
  const amount = cart.reduce((acc, item) => acc + item.totalPrice, 0)
  const { street, number, apartment } = userData?.addresses[0]
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
              <span>Punto de entrega:</span> {street + ` ` + number + ' ' + apartment}
            </p>
            <span className={styles.adressBtn}>
              <FiEdit style={{ color: '#fe6849', fontSize: '1.5em' }} />
            </span>
          </div>
          <div className={styles.payBtn}>
            <p className={styles.totalPrice}>
              <span>Precio total:</span> $ {formatter.format(amount)}
            </p>
            <button onClick={() => props.history.push('/checkout/order')}>Pagar</button>
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
            {cart?.map((cartItem) => (
              <CartItem
                key={cartItem._id}
                cartItem={cartItem}
                manageCart={manageCart}
                userData={userData}
                setEdit={setEdit}
                setCartItem={setCartItem}
              />
            ))}
          </div>
        </div>
      </div>
      {edit && <Product product={cartItem.productId} editCartItem={cartItem} setMod={setEdit} edit={edit} />}
      <Toaster
        containerStyle={{
          top: 200,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 1500,
        }}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
  }
}

const mapDispatchToProps = {
  manageCart: userActions.manageCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
