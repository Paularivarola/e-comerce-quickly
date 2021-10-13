import React, { useState } from 'react'
import Card from './CARD'
import styles from '../styles/personalData.module.css'
import { BsTrash, BsCreditCard2BackFill } from 'react-icons/bs'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
// import toastConfirm from './ToastConfirm'

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
      {/* <BsTrash onClick={() => toastConfirm(() => updateUser({ action: 'deletePaymentCard', paymentCardId: id }))} /> */}
    </div>
  )
}

const Payment = ({ userData, updateUser, setActive, active, cardModal, setCardModal }) => {
  window.onclick = (e) => {
    if (e.target.dataset.modal === 'paymentModal') setCardModal(false)
  }
  return (
    <div className={styles.mainPayment}>
      {!userData?.paymentCards?.length ? (
        <div className={styles.containMessage}>
          <h1 className={styles.message}>No hay tarjetas cargadas</h1>
          <h1 className={styles.message2}>Asegurese de tener al menos una tarjeta cargada antes de realizar su compra :)</h1>
        </div>
      ) : (
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
      )}
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
