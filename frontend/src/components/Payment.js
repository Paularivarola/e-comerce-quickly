import React, { useState } from 'react'

// import Cards from './Cards'
import Card from './CARD'
import styles from '../styles/personalData.module.css'
import { BsTrash } from 'react-icons/bs'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
import toastConfirm from './ToastConfirm'

const PaymentCard = ({ updateUser, card, id }) => {
  return (
    <div className={styles.addressCard}>
      <span>
        Tarjeta {card?.brand.toUpperCase()} ...{card?.last4}
      </span>
      <BsTrash
        onClick={() =>
          toastConfirm(() =>
            updateUser({ action: 'deletePaymentCard', paymentCardId: id })
          )
        }
      />
    </div>
  )
}
const Payment = ({ userData, updateUser }) => {
  return (
    <div>
      <div style={{ marginBottom: '10%' }}>
        {userData?.paymentCards?.map((payment) => (
          <PaymentCard
            updateUser={updateUser}
            card={payment.card}
            id={payment.id}
            key={payment.id}
          />
        ))}
      </div>
      <Card />
      {/* Payment
      <Cards /> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
  }
}
const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
