import React, { useEffect, useState } from 'react'
import Preloader from '../components/Preloader'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'
import userActions from '../redux/actions/userActions'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { BsPencilSquare, BsCheckSquare, BsXSquare } from 'react-icons/bs'
import { connect } from 'react-redux'
import { style } from '@mui/system'

const MyTextField = ({ name, inputHandler }) => {
  const [update, setUpdate] = useState(false)
  const icons = (
    <InputAdornment position='end'>
      {!update ? (
        <IconButton onClick={() => setUpdate(true)} edge='end'>
          <BsPencilSquare />
        </IconButton>
      ) : (
        <>
          <IconButton onClick={() => setUpdate(false)} edge='end'>
            <BsCheckSquare />
          </IconButton>
          <IconButton onClick={() => setUpdate(false)} edge='end'>
            <BsXSquare />
          </IconButton>
        </>
      )}
    </InputAdornment>
  )

  return (
    <TextField
      type='text'
      disabled={!update}
      name='firstName'
      defaultValue={name}
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
  )
}

const PersonalData = ({ user, updateUser }) => {
  const initialState = {
    firstName: user?.firstName,
    lastName: user?.lastName,
  }
  const [userData, setUserData] = useState()

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

    // if (!valid) {
    //   return setUpdate(false)
    // }
    // if(user.firstName && user.lastName && user.email && user.email.includes('@') && user.password && user.repPass && user.password === user.repPass){
    //   aca sale la funcion linda
    // }
    console.log('esta todo bien')
    updateUser({ action: 'updateData', userData })
  }

  return (
    <div className={styles.mainPersonalData}>
      <div className={styles.formBox}>
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
          <span className={styles.submitPhoto}>
            Cambiar foto
          </span>
        </label>
        <input id='imgUpdate' type='file' onChange={submitFile} style={{ display: 'none' }} />
        <div className={styles.containForm}>
          {!user ? (
            <Preloader />
          ) : (
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
              }}
              noValidate
              autoComplete='off'
            >
              <MyTextField name={user?.firstName} inputHandler={inputHandler}/>
              <MyTextField name={user?.lastName} inputHandler={inputHandler}/>
              <TextField
                type='email'
                disabled
                name='email'
                defaultValue={user?.email}
                label='Email'
                variant='outlined'
                onChange={inputHandler}
                // sx={{
                //   '& > :not(style)': { width: '25vw' },
                // }}
              />
            </Box>
          )}
          <div className={styles.buttonBox}>
            <button onClick={() => validatorFront()}>guardar cambios</button>
          </div>
        </div>
        {/* <div className={styles.containImageEdit}>
          <div
            className={styles.ImageEdit}
            style={{ backgroundImage: 'url("/assets/edit.png")' }}
            onClick={() => setUpdate(!update)}
          ></div>
        </div> */}
      </div>
      </div>
  )
}

const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(null, mapDispatchToProps)(PersonalData)
