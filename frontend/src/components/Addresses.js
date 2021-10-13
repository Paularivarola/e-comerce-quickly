import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
import { ImCancelCircle } from 'react-icons/im'
import { BsTrash } from 'react-icons/bs'
import CardTost from './CardTost'
import Card from './CARD'

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

const PaymentCard = ({
  updateUser,
  card,
  id,
  setActive,
  active,
  index,
  setCardTost,
  setFunctionX,
}) => {
  return (
    <div className={active ? styles.active : styles.addressCard}>
      <span className={styles.addressAlias}>
        Tarjeta {card?.brand.toUpperCase()} ...{card?.last4}
      </span>
      {setActive && !active && (
        <span
          onClick={() => setActive({ ...active, card: index })}
          style={{ cursor: 'pointer' }}
        >
          Seleccionar
        </span>
      )}
      <BsTrash
        onClick={() => {
          setFunctionX(() =>
            updateUser({ action: 'deletePaymentCard', paymentCardId: id })
          )
          setCardTost({
            time: 7000,
            icon: 'error',
            text: 'No podras revertir estos cambios',
            view: true,
            tost: 'accept',
            question: '¿Borrar?',
          })
        }}
      />
    </div>
  )
}

const Address = ({
  updateUser,
  address,
  active,
  setActive,
  index,
  setCardTost,
  setFunctionX,
}) => {
  return (
    <div className={active ? styles.active : styles.addressCard}>
      <div>
        <span className={styles.addressAlias}>
          {address?.alias.toUpperCase()}
        </span>
        <span className={styles.addressName}>
          {address.street + ', ' + address.number + ' - ' + address.apartment}
        </span>
      </div>
      {setActive && !active && (
        <span
          onClick={() => setActive({ ...active, address: index })}
          style={{ cursor: 'pointer' }}
        >
          Seleccionar
        </span>
      )}
      <BsTrash
        style={{ color: 'tomato' }}
        onClick={() => {
          setFunctionX(() =>
            updateUser({ action: 'deleteAddress', addressId: address._id })
          )
          setCardTost({
            time: 7000,
            icon: 'error',
            text: 'No podras revertir estos cambios',
            view: true,
            tost: 'accept',
            question: '¿Borrar?',
          })
        }}
      />
    </div>
  )
}
//
const Addresses = ({
  updateUser,
  userData,
  active,
  setActive,
  modal,
  setModal,
  view,
}) => {
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

  const initialCardTostState = {
    time: '',
    icon: '',
    text: '',
    view: false,
    tost: '',
  }
  const [cardTost, setCardTost] = useState(initialCardTostState)
  const [functionX, setFunctionX] = useState(null)
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
      {cardTost.view && (
        <CardTost properties={cardTost} setCardTost={setCardTost} />
      )}
      <img
        className={styles.world}
        src='https://i.postimg.cc/L5DpZzqw/globoterraqueo.png'
        alt='world'
      />
      {!userData?.addresses?.length || !userData?.paymentCards?.length ? (
        <div className={styles.containFormAddress}>
          <h1 className={styles.message}>
            {view
              ? 'No tenes ninguna direccion todavia'
              : 'No hay tarjetas cargadas'}
          </h1>
          {!view && (
            <h1 className={styles.message2}>
              Asegurese de tener al menos una tarjeta cargada antes de realizar
              su compra :)
            </h1>
          )}
        </div>
      ) : (
        <div className={styles.addressesContainer}>
          {view
            ? userData.addresses.map((address, index) => (
                <Address
                  setFunctionX={setFunctionX}
                  key={address._id}
                  address={address}
                  updateUser={updateUser}
                  index={index}
                  active={index === active?.address}
                  setActive={setActive}
                  setCardTost={setCardTost}
                />
              ))
            : userData?.paymentCards?.map((payment, index) => (
                <PaymentCard
                  setFunctionX={setFunctionX}
                  updateUser={updateUser}
                  card={payment.card}
                  id={payment.id}
                  key={payment.id}
                  index={index}
                  active={active?.card === index}
                  setActive={setActive}
                  setCardTost={setCardTost}
                />
              ))}
        </div>
      )}
      {cardTost.view && (
        <CardTost
          properties={cardTost}
          setCardTost={setCardTost}
          accept={() => functionX()}
          deny={() => setCardTost(initialState)}
        />
      )}
      {modal &&
        (!view ? (
          <div className={styles.containFormModal} data-modal='addressModal'>
            <div className={styles.containFormAddress}>
              <ImCancelCircle
                className={styles.exit}
                onClick={() => setModal(false)}
                style={{ marginRight: '6%', color: 'tomato' }}
              />
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
                <ImCancelCircle
                  className={styles.exit}
                  onClick={() => setModal(false)}
                  style={{ marginRight: '6%', color: 'tomato' }}
                />
                {inputs.map((input) => (
                  <MyInput
                    input={input}
                    key={input.label}
                    setNewAddress={setNewAddress}
                    newAddress={newAddress}
                  />
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
