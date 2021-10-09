import { connect } from 'react-redux'
import styles from '../styles/signup.module.css'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const SignForm = (props) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repPass: '',
    action: 'sign',
    src: null,
    google: false,
  })
  const [shift, setShift] = useState(props.match.params.susi === 'signup')

  useEffect(() => {
    setShift(props.match.params.susi === 'signup')
  }, [props.match.params])

  const responseGoogle = (googleRegister) => {
    let googleUser = {
      firstName: googleRegister.profileObj.givenName,
      lastName: googleRegister.profileObj.familyName,
      email: googleRegister.profileObj.email,
      src: googleRegister.profileObj.imageUrl,
      password: googleRegister.profileObj.googleId,
      google: true,
      action: 'sign',
    }
    if (shift) {
      props.createUser(googleUser, props)
    } else {
      props.logUser(googleUser, props)
    }
  }

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.name === 'src' ? e.target.files[0] : e.target.value,
    })
  }

  const validatorFront = () => {
    if (!shift) {
      if (!user.email && !user.password) {
        alert('Todos las campos son obligatorios')
      } else {
        !user.email.includes('@') && alert('El email no es válido')
        !user.email && alert('Ingresá tu email')
        !user.password && alert('Ingresá tu contraseña')
      }
      return Boolean(user.email && user.email.includes('@') && user.password)
    } else {
      if (Object.keys(user).every((property) => !user[property])) {
        alert('Todos las campos son obligatorios')
      } else {
        !user.firstName && alert('Ingresá tu nombre')
        !user.lastName && alert('Ingresá tu apellido')
        !user.repPass && alert('Valide su contraseña')
        user.password !== user.repPass && alert('Las contraseñas no coiciden')
      }
      return Boolean(
        user.firstName &&
          user.lastName &&
          user.email &&
          user.email.includes('@') &&
          user.password &&
          user.repPass &&
          user.password === user.repPass
      )
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validatorFront()) return false
    const { firstName, lastName, email, password, google, src } = user
    const fd = new FormData()
    fd.append('email', email)
    fd.append('password', password)
    if (shift) {
      fd.append('firstName', firstName)
      fd.append('lastName', lastName)
      fd.append('google', google)
      fd.append(google ? 'src' : 'fileImg', src)
      props.createUser(fd, props)
    } else {
      props.logUser(user, props)
    }
  }

  return (
    <main className={styles.mainSign}>
      <div className={styles.boxButtons}>
        <div className={styles.boxlogin}>
          <h1 className={styles.h1}>
            {!shift ? 'Crear una cuenta' : 'Ingresar con tus datos'}
          </h1>
          <div className={styles.boxGoogle}>
            <GoogleLogin
              className={styles.btnGoogle}
              clientId='700780098168-b35ln15khokfkbats4tm4sl7cbcv3bup.apps.googleusercontent.com'
              buttonText='con Google Account'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          <p className={styles.p}>o ingresa tus datos en el formulario</p>
          {/* <div className={styles.option}>
              <hr className={styles.line}></hr>
              <p>o</p>
              <hr className={styles.line}></hr>
            </div> */}
        </div>
        <img
          className={styles.memeLogin}
          src='https://i.postimg.cc/rFQ6QKxZ/memelogin.png'
          alt='manLog'
        />
        <div className={styles.boxButton}>
          <p
            className={!shift ? styles.activeButton : styles.button}
            onClick={() => setShift(false)}
          >
            Ingresá
          </p>
          <p
            className={shift ? styles.activeButton : styles.button}
            onClick={() => setShift(true)}
          >
            Registrate
          </p>
        </div>
        {/* <img className={styles.imgLogin} src='https://i.postimg.cc/MX2PHY8p/Collab.png' alt='manLog' /> */}
      </div>
      <div className={styles.boxDiv}>
        <div className={styles.boxForm}>
          {!shift ? (
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 2, width: '30ch' },
              }}
              noValidate
              autoComplete='off'
            >
              <div className={styles.inputsForm}>
                <TextField
                  required
                  id='outlined-required'
                  label='Email'
                  type='email'
                  name='email'
                  defaultValue={user.email}
                  onChange={inputHandler}
                  color='warning'
                  size='small'
                  // error
                  // helperText="Incorrect entry."
                />
                <TextField
                  required
                  id='outlined-password-input'
                  label='Contraseña'
                  type='password'
                  autoComplete='current-password'
                  name='password'
                  onChange={inputHandler}
                  defaultValue={user.password}
                  color='warning'
                  size='small'
                  // error
                  // helperText="Incorrect entry."
                />
              </div>
            </Box>
          ) : (
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 1.5, width: '30ch' },
              }}
              noValidate
              autoComplete='off'
            >
              <div className={styles.inputsForm2}>
                <div className={styles.inputsFormName}>
                  <TextField
                    required
                    id='outlined-required'
                    label='Nombre'
                    type='text'
                    name='firstName'
                    onChange={inputHandler}
                    defaultValue={user.firstName}
                    color='warning'
                    size='small'
                    fullWidth
                    // error
                    // helperText="Incorrect entry."
                  />
                  <TextField
                    required
                    id='outlined-required'
                    label='Apellido'
                    type='text'
                    name='lastName'
                    onChange={inputHandler}
                    defaultValue={user.lastName}
                    color='warning'
                    size='small'
                    fullWidth
                    // error
                    // helperText="Incorrect entry."
                  />
                </div>
                <div className={styles.inputsFormColum}>
                  <TextField
                    required
                    id='outlined-required'
                    label='Email'
                    type='email'
                    name='email'
                    onChange={inputHandler}
                    defaultValue={user.email}
                    color='warning'
                    size='small'
                    fullWidth
                    // error
                    // helperText="Incorrect entry."
                  />
                  <TextField
                    required
                    id='outlined-password-input'
                    label='Contraseña'
                    type='password'
                    name='password'
                    onChange={inputHandler}
                    defaultValue={user.password}
                    color='warning'
                    size='small'
                    fullWidth
                    // error
                    // helperText="Incorrect entry."
                  />
                  <TextField
                    required
                    id='outlined-password-input'
                    label='Repite contraseña'
                    type='password'
                    name='repPass'
                    onChange={inputHandler}
                    defaultValue={user.repPass}
                    color='warning'
                    size='small'
                    fullWidth
                    // error
                    // helperText="Incorrect entry."
                  />
                </div>
                <div className={styles.boxFile}>
                  <label htmlFor='Foto'>
                    <span className={styles.submitPhoto}>
                      {user?.src ? 'Foto cargada' : 'Cargar foto de perfil'}
                    </span>
                  </label>
                  <input
                    id='Foto'
                    style={{ display: 'none' }}
                    type='file'
                    name='src'
                    placeholder='Agregá una foto de perfil'
                    onChange={inputHandler}
                    defaultValue={user.src}
                  />
                </div>
              </div>
            </Box>
          )}
          <span className={styles.submitButton} onClick={submit}>
            Enviar!
          </span>
        </div>
      </div>
    </main>
  )
}

const mapDispatchToProps = {
  createUser: userActions.createUser,
  logUser: userActions.logUser,
}

export default connect(null, mapDispatchToProps)(SignForm)
