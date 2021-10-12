import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'
import userActions from '../redux/actions/userActions'
import toastConfirm from './ToastConfirm'
import { connect } from 'react-redux'
import { ImCancelCircle } from 'react-icons/im'
import { BsTrash } from 'react-icons/bs'
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
        '& > :not(style)': { width: '25vw' },
      }}
    />
  )
}

const Address = ({ updateUser, address, active, setActive, index }) => {
  return (
    <div className={active ? styles.active : styles.addressCard}>
      <div>
        <span className={styles.addressAlias}>{address?.alias.toUpperCase()}</span>
        <span className={styles.addressName}>{address.street + ', ' + address.number + ' - ' + address.apartment}</span>
      </div>
      {setActive && !active && (
        <span onClick={() => setActive({ ...active, address: index })} style={{ cursor: 'pointer' }}>
          Seleccionar
        </span>
      )}
      <BsTrash
        style={{ color: 'tomato' }}
        onClick={() => toastConfirm(() => updateUser({ action: 'deleteAddress', addressId: address._id }))}
      />
    </div>
  )
}

const Addresses = ({ updateUser, userData, active, setActive, modal, setModal }) => {
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
  const [cardTost, setCardTost] = useState({
    time: '',
    icon: '',
    text: '',
    view: false,
  })

  const [newAddress, setNewAddress] = useState(initialState)
  const submitHandler = () => {
    let validate = Object.values(newAddress).some((prop) => prop === '')
    if (validate) {
      return setCardTost({ time: 1500, icon: 'error', text: 'Complete todos los campos', view: true })
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
      {cardTost.view && <CardTost properties={cardTost} setCardTost={setCardTost} />}
      <img className={styles.world} src='https://i.postimg.cc/L5DpZzqw/globoterraqueo.png' alt='world' />
      {!userData ? (
        <div className={styles.containFormAddress}>
          <h1>No tenes ninguna direccion todavia</h1>
        </div>
      ) : (
        <div className={styles.addressesContainer}>
          {userData.addresses.map((address, index) => (
            <Address
              key={address._id}
              address={address}
              updateUser={updateUser}
              index={index}
              active={index === active?.address}
              setActive={setActive}
            />
          ))}
        </div>
      )}
      {modal && (
        <div className={styles.containFormModal} data-modal='addressModal'>
          <div className={styles.containFormAddress}>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete='off'
            >
              <ImCancelCircle className={styles.exit} onClick={() => setModal(false)} style={{ marginRight: '6%', color: 'tomato' }} />
              {inputs.map((input) => (
                <MyInput input={input} key={input.label} setNewAddress={setNewAddress} newAddress={newAddress} />
              ))}
            </Box>
            <button onClick={submitHandler}>enviar</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Addresses)
