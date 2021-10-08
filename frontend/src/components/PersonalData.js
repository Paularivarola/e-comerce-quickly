import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'
import userActions from '../redux/actions/userActions'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { BsPencilSquare, BsCheckSquare, BsXSquare } from 'react-icons/bs'
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

  const icons = (
    <InputAdornment position='end'>
      {!update ? (
        <IconButton aria-label='toggle password visibility' onClick={() => setUpdate(true)} edge='end'>
          <BsPencilSquare />
        </IconButton>
      ) : (
        <>
          <IconButton aria-label='toggle password visibility' onClick={() => setUpdate(false)} edge='end'>
            <BsCheckSquare />
          </IconButton>
          <IconButton aria-label='toggle password visibility' onClick={() => setUpdate(false)} edge='end'>
            <BsXSquare />
          </IconButton>
        </>
      )}
    </InputAdornment>
  )

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
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            type='text'
            disabled={!update}
            name='firstName'
            value={userData?.firstName}
            label={'Nombre'}
            variant='outlined'
            onChange={inputHandler}
            InputProps={{
              endAdornment: icons,
            }}
            sx={{
              '& > :not(style)': { width: '25vw' },
            }}
          />
          <TextField
            disabled={!update}
            type='text'
            name='lastName'
            value={userData?.lastName}
            label={'Apellido'}
            variant='outlined'
            onChange={inputHandler}
            InputProps={{
              endAdornment: icons,
            }}
            sx={{
              '& > :not(style)': { width: '25vw' },
            }}
          />
          <TextField
            type='email'
            disabled
            name='email'
            value={user?.email}
            label='Email'
            variant='outlined'
            onChange={inputHandler}
            sx={{
              '& > :not(style)': { width: '25vw' },
            }}
          />
        </Box>
        <button onClick={() => validatorFront()}>guardar cambios</button>
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
