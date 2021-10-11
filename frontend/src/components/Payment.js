import React, { useState } from 'react'
import Card from './CARD'
import styles from '../styles/personalData.module.css'
import { BsTrash } from 'react-icons/bs'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
import toastConfirm from './ToastConfirm'

const PaymentCard = ({ updateUser, card, id, setActive, active, index }) => {
  return (
    <div className={active ? styles.activeCard : styles.paymentCard}>
      <span>
        Tarjeta {card?.brand.toUpperCase()} ...{card?.last4}
      </span>
      {setActive && !active && (
        <span onClick={() => setActive({ ...active, card: index })} style={{ cursor: 'pointer' }}>
          Seleccionar
        </span>
      )}
      <BsTrash onClick={() => toastConfirm(() => updateUser({ action: 'deletePaymentCard', paymentCardId: id }))} />
    </div>
  )
}

const Payment = ({ userData, updateUser, setActive, active, cardModal, setCardModal }) => {
  window.onclick = (e) => {
    if (e.target.dataset.modal === 'paymentModal') setCardModal(false)
  }
  console.log(cardModal)
  return (
    <div className={styles.mainPayment}>
      <div className={styles.boxCard}>
        {userData?.paymentCards?.map((payment, index) => (
          <PaymentCard
            updateUser={updateUser}
            card={payment.card}
            id={payment.id}
            key={payment.id}
            index={index}
            active={active?.card === index}
            setActive={setActive}
          />
        ))}
      </div>
      {cardModal && (
        <div className={styles.containFormModal} data-modal='paymentModal'>
          <div className={styles.containFormAddress}>
            <Card setCardModal={setCardModal} />
          </div>
        </div>
      )}
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
