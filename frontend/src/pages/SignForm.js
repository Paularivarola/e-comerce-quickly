import { connect } from 'react-redux'
import CardTost from '../components/CardTost'
import styles from '../styles/signup.module.css'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

const MyInput = ({ label, name, inputHandler }) => {
  const [passProtected, setPassProtected] = useState(true)

  return (
    <TextField
      type={passProtected ? 'password' : 'text'}
      name={name}
      label={label}
      variant='outlined'
      color='warning'
      size='small'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end' style={{ width: '2rem' }}>
            <IconButton onClick={(e) => setPassProtected(!passProtected)} edge='end'>
              {passProtected ? <BsEyeSlash /> : <BsEye />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={inputHandler}
    />
  )
}

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
  const [cardTost, setCardTost] = useState({
    time: '',
    icon: '',
    text: '',
    view: false,
  })
  const [shift, setShift] = useState(props.match.params.susi === 'signup')
  useEffect(() => {
    setShift(props.match.params.susi === 'signup')
    // props.history.push('/sign-forms/' + props.match.params.susi)
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
      [e.target.name]: e.target.name === 'src' ? e.target.files[0] : e.target.value,
    })
  }

  const sendToast = () => {
    if (!shift) {
      if (!user.email && !user.password) {
        return setCardTost({
          time: 1500,
          icon: 'error',
          text: 'Complete todos los campos',
          view: true,
        })
      } else {
        if (!user.email.includes('@')) return setCardTost({ time: 1500, icon: 'error', text: 'El mail no es valido', view: true })
        if (!user.email) return setCardTost({ time: 1500, icon: 'error', text: 'Ingresa tu mail', view: true })
        if (!user.password) return setCardTost({ time: 1500, icon: 'error', text: 'Ingresa tu contraseña', view: true })
      }
    } else {
      if (
        Object.keys(user)
          .slice(0, 5)
          .every((property) => !user[property])
      ) {
        setCardTost({ time: 1500, icon: 'error', text: 'Complete todos los campos', view: true })
      } else {
        if (!user.firstName) return setCardTost({ time: 1500, icon: 'error', text: 'Ingresa tu Nombre', view: true })
        if (!user.lastName) return setCardTost({ time: 1500, icon: 'error', text: 'Ingresa tu Apellido', view: true })
        if (!user.email) return setCardTost({ time: 1500, icon: 'error', text: 'Ingresa tu mail', view: true })
        if (!user.email.includes('@')) return setCardTost({ time: 1500, icon: 'error', text: 'El mail no es valido', view: true })
        if (!user.password) return setCardTost({ time: 1500, icon: 'error', text: 'Ingresa tu contraseña', view: true })
        if (!user.repPass) return setCardTost({ time: 1500, icon: 'error', text: 'Valide su contraseña', view: true })
        if (user.password !== user.repPass)
          return setCardTost({ time: 1500, icon: 'error', text: 'La contraseña no coinciden', view: true })
      }
    }
  }

  const validatorFront = () => {
    if (!shift) {
      return Boolean(user.email && user.email.includes('@') && user.password)
    } else {
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
    if (!validatorFront()) return sendToast()
    const { firstName, lastName, email, password, google, src, repPass } = user
    const fd = new FormData()
    fd.append('email', email)
    fd.append('password', password)
    if (shift) {
      fd.append('firstName', firstName)
      fd.append('lastName', lastName)
      fd.append('google', google)
      fd.append(google ? 'src' : 'fileImg', src)
      props.createUser(fd, props).then((res) => console.log(res))
    } else {
      props.logUser(user, props)
    }
  }

  return (
    <main className={styles.mainSign}>
      {cardTost.view && <CardTost properties={cardTost} setCardTost={setCardTost} />}
      <div className={styles.boxButtons}>
        <div className={styles.boxlogin}>
          <h1 className={styles.h1}>{!shift ? 'Crear una cuenta' : 'Ingresar con tus datos'}</h1>
          <div className={styles.boxGoogle}>
            <GoogleLogin
              className={styles.btnGoogle}
              clientId='82723603056-o12gv1mu2alua7qnd7igq2rlrj6he3gg.apps.googleusercontent.com'
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
        <img className={styles.memeLogin} src='https://i.postimg.cc/rFQ6QKxZ/memelogin.png' alt='manLog' />
        <div className={styles.boxButton}>
          <p className={!shift ? styles.activeButton : styles.button} onClick={() => setShift(false)}>
            Ingresá
          </p>
          <p className={shift ? styles.activeButton : styles.button} onClick={() => setShift(true)}>
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
                <MyInput label='Contraseña' name='password' inputHandler={inputHandler} />
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
                    color='warning'
                    size='small'
                    fullWidth
                    // error
                    // helperText="Incorrect entry."
                  />
                  <MyInput label='Contraseña' name='password' inputHandler={inputHandler} />
                  <MyInput label='Repite contraseña' name='repPass' inputHandler={inputHandler} />
                </div>
                <div className={styles.boxFile}>
                  <label htmlFor='Foto'>
                    <span className={styles.submitPhoto}>{user?.src ? 'Foto cargada' : 'Cargar foto de perfil'}</span>
                  </label>
                  <input
                    id='Foto'
                    style={{ display: 'none' }}
                    type='file'
                    name='src'
                    placeholder='Agregá una foto de perfil'
                    onChange={inputHandler}
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
