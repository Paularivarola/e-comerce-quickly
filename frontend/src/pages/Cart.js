import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/personalData.module.css'
import { BsTrash, BsPencilSquare } from 'react-icons/bs'
import userActions from '../redux/actions/userActions'
import toastConfirm from '../components/ToastConfirm'
import { Toaster } from 'react-hot-toast'
import Product from '../components/Product'

const CartItem = ({ cartItem, manageCart, userData, setEdit, setCartItem }) => {
  console.log(cartItem)
  return (
    <div className={styles.addressCard}>
      <span>{cartItem.totalPrice}</span>
      <BsTrash
        onClick={() =>
          toastConfirm(() =>
            manageCart({ action: 'delete', cartItem, _id: userData._id })
          )
        }
        style={{ cursor: 'pointer' }}
      />
      <BsPencilSquare
        onClick={() => {
          setCartItem(cartItem)
          setEdit(true)
        }}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

const Cart = ({ manageCart, userData, ...props }) => {
  const [edit, setEdit] = useState(false)
  const [cartItem, setCartItem] = useState({})
  const cart = JSON.parse(localStorage.getItem('cart'))
  return (
    <div>
      <div style={{ marginBottom: '10%' }}>
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
      {edit && (
        <Product
          product={cartItem.productId}
          editCartItem={cartItem}
          setMod={setEdit}
          edit={edit}
        />
      )}
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
      <button onClick={() => props.history.push('/checkout')}>PAGAR</button>
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
