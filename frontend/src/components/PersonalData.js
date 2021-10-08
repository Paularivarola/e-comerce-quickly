import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'

const PersonalData = ({ user, updateUser }) => {
  const initialState = {
    firstName: user?.firstName,
    lastName: user?.lastName,
  }
  const [userData, setUserData] = useState()
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setUserData({
      firstName: user?.firstName,
      lastName: user?.lastName,
    })
  }, [user])

  const submitFile = (e) => {
    const fileImg = new FormData()
    fileImg.append('fileImg', e.target.files[0])
    updateUser({ action: 'changePicture', fileImg })
  }

  const inputHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const validatorFront = () => {
    let initialValues = Object.values(initialState)
    let valid = Object.values(userData).some((value, index) => {
      return value !== initialValues[index]
    })

    if (!valid) {
      return setUpdate(false)
    }
    // if(user.firstName && user.lastName && user.email && user.email.includes('@') && user.password && user.repPass && user.password === user.repPass){
    //   aca sale la funcion linda
    // }
    console.log('esta todo bien')
    updateUser({ action: 'updateData', userData })
  }

  return (
    <div className={styles.containPersonalData}>
      <label htmlFor='imgUpdate'>
        <div
          className={styles.containImage}
          style={{
            backgroundImage: `url("${
              user
                ? user.google || user.admin.flag
                  ? user.src
                  : user.src !== 'assets/user.png'
                  ? 'http://localhost:4000/' + user.src
                  : '/assets/user.png'
                : '/assets/user.png'
            }")`,
          }}
        ></div>
      </label>
      <input id='imgUpdate' type='file' onChange={submitFile} style={{ display: 'none' }} />
      <div className={styles.containForm}>
        {update ? (
          <>
            <Box
              component='form'
              sx={{
                '& > :not(style)': { m: 1, width: '25vh' },
              }}
              noValidate
              autoComplete='off'
            >
              <TextField
                type='text'
                name='firstName'
                defaultValue={user?.firstName}
                label='Nombre'
                variant='outlined'
                onChange={inputHandler}
                sx={{
                  '& > :not(style)': { width: '25vw' },
                }}
              />
              <TextField
                type='text'
                name='lastName'
                defaultValue={user?.lastName}
                label='Apellido'
                variant='outlined'
                onChange={inputHandler}
                sx={{
                  '& > :not(style)': { width: '25vw' },
                }}
              />
              <TextField
                type='email'
                disabled
                name='email'
                defaultValue={user?.email}
                label='Email'
                variant='outlined'
                onChange={inputHandler}
                sx={{
                  '& > :not(style)': { width: '25vw' },
                }}
              />
            </Box>
            <button onClick={() => validatorFront()}>enviar</button>
          </>
        ) : (
          <div className={styles.containTitle}>
            <h2>{user?.firstName}</h2>
            <h2>{user?.lastName}</h2>
            <h2>{user?.email}</h2>
          </div>
        )}
      </div>
      <div className={styles.containImageEdit}>
        <div
          className={styles.ImageEdit}
          style={{ backgroundImage: 'url("/assets/edit.png")' }}
          onClick={() => setUpdate(!update)}
        ></div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(null, mapDispatchToProps)(PersonalData)
