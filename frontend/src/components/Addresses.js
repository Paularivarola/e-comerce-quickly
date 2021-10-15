import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
import { ImCancelCircle } from 'react-icons/im'
import { BsTrash } from 'react-icons/bs'
import Card from './CARD'
import Swal from 'sweetalert2'
import CardTost from './CardTost'

const MyInput = ({ input, newAddress, setNewAddress }) => {
  const inputHandler = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <TextField
      type='text'
      name={input.name}
      label={input.label}
      value={newAddress[input.name]}
      variant='outlined'
      size='small'
      fullWidth
      color='warning'
      onChange={inputHandler}
      sx={{
        '& > :not(style)': { width: '30vw', marginBottom: '10px' },
      }}
    />
  )
}

const PaymentCard = ({ updateUser, card, id, setActive, active, index, act }) => {
  const clickHandler = () => {
    Swal.fire({
      title: 'Estás seguro que deseas borrar la tarjeta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser({ action: 'deletePaymentCard', paymentCardId: id })
      }
    })
  }

  return (
    <div
      onClick={() => setActive && setActive({ ...act, card: index })}
      style={{ cursor: 'pointer' }}
      className={active ? styles.activeCard : styles.addressCard}
    >
      <span className={styles.addressAlias}>
        Tarjeta {card?.brand.toUpperCase()} ...{card?.last4}
      </span>
      <BsTrash onClick={clickHandler} style={{ cursor: 'pointer' }} />
    </div>
  )
}

const Address = ({ updateUser, address, active, setActive, index, act }) => {
  const clickHandler = () => {
    Swal.fire({
      title: 'Estás seguro que deseas borrar la dirección?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser({ action: 'deleteAddress', addressId: address._id })
      }
    })
  }
  return (
    <div
      onClick={() => setActive && setActive({ ...act, address: index })}
      style={{ cursor: 'pointer' }}
      className={active ? styles.activeCard : styles.addressCard}
    >
      <div>
        <span className={styles.addressAlias}>{address?.alias.toUpperCase()}</span>
        <span className={styles.addressName}>{address.street + ', ' + address.number + ' - ' + address.apartment}</span>
      </div>
      <BsTrash style={{ color: 'tomato', cursor: 'pointer' }} onClick={clickHandler} />
    </div>
  )
}
//
const Addresses = ({ updateUser, userData, active, setActive, modal, setModal, view }) => {
  const inputs = [
    { name: 'alias', label: 'Alias' },
    { name: 'street', label: 'Calle' },
    { name: 'number', label: 'Numeración' },
    { name: 'apartment', label: 'Departamento' },
    { name: 'neighborhood', label: 'Barrio / Partido / Localidad' },
  ]
  let initialState = {
    alias: '',
    street: '',
    number: '',
    apartment: '',
    neighborhood: '',
  }

  const [cardTost, setCardTost] = useState(null)

  const [newAddress, setNewAddress] = useState(initialState)
  const submitHandler = () => {
    let validate = Object.values(newAddress).some((prop) => prop === '')
    if (validate) {
      return setCardTost({
        time: 1500,
        icon: 'error',
        text: 'Complete todos los campos',
        view: true,
      })
    }
    updateUser({ action: 'addAddress', newAddress })
    setModal(!modal)
    setNewAddress(initialState)
  }

  window.onclick = (e) => {
    if (e.target.dataset.modal === 'addressModal') setModal(false)
  }

  return (
    <div className={styles.mainAddress}>
      {cardTost?.view && <CardTost properties={cardTost} setCardTost={setCardTost} />}
      <img className={styles.world} src={view ? 'https://i.postimg.cc/L5DpZzqw/globoterraqueo.png' : 'https://i.postimg.cc/QtKg6LzK/tarjeta.png'} alt='world' />
      {((!userData?.addresses?.length && view) || (!userData?.paymentCards?.length && !view)) && (
        <>
          <div className={styles.containFormAddress}>
            <h1 className={styles.message}>{view ? 'No tenes ninguna direccion todavia' : 'No hay tarjetas cargadas'}</h1>
            <h1 className={styles.message2}>
              {view
                ? 'Asegurese de tener al menos una dirección cargada antes de realizar su compra'
                : 'Asegurese de tener al menos una tarjeta cargada antes de realizar su compra'}
            </h1>
          </div>
        </>
      )}

      {(userData?.addresses?.length && view) || (userData?.paymentCards?.length && !view) ? (
        <div className={styles.addressesContainer}>
          {view
            ? userData.addresses.map((address, index) => (
                <Address
                  key={address._id}
                  address={address}
                  updateUser={updateUser}
                  index={index}
                  act={active}
                  active={index === active?.address}
                  setActive={setActive}
                  setCardTost={setCardTost}
                />
              ))
            : userData?.paymentCards?.map((payment, index) => (
                <PaymentCard
                  updateUser={updateUser}
                  card={payment.card}
                  id={payment.id}
                  key={payment.id}
                  index={index}
                  active={active?.card === index}
                  act={active}
                  setActive={setActive}
                  setCardTost={setCardTost}
                />
              ))}
        </div>
      ) : null}

      {modal &&
        (!view ? (
          <div className={styles.containFormModal} data-modal='addressModal'>
            <div className={styles.containFormAddress}>
              <ImCancelCircle className={styles.exit} onClick={() => setModal(false)} style={{ marginRight: '6%', color: 'tomato' }} />
              <Card setCardModal={setModal} />
            </div>
          </div>
        ) : (
          <div className={styles.containFormModal} data-modal='addressModal'>
            <div className={styles.containFormAddress}>
              <Box
                component='form'
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '30vw' },
                }}
                noValidate
                autoComplete='off'
              >
                <ImCancelCircle className={styles.exit} onClick={() => setModal(false)} style={{ marginRight: '6%', color: 'tomato' }} />
                {inputs.map((input) => (
                  <MyInput input={input} key={input.label} setNewAddress={setNewAddress} newAddress={newAddress} />
                ))}
              </Box>
              <button style={{ marginTop: '1rem' }} onClick={submitHandler}>
                Agregar
              </button>
            </div>
          </div>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Addresses)
