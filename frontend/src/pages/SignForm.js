import { connect } from 'react-redux'
import styles from '../styles/signup.module.css'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import userActions from '../redux/actions/userActions'
import { useEffect } from 'react'

const SignForm = (props) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repPass: '',
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
      return Boolean(user.firstName && user.lastName && user.email && user.email.includes('@') && user.password && user.repPass && user.password === user.repPass)
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
      <div className={styles.boxDiv}>
        <div className={styles.boxButton}>
          <p className={!shift ? styles.activeButton : styles.button} onClick={() => setShift(false)}>
            Ingresá
          </p>
          <p className={shift ? styles.activeButton : styles.button} onClick={() => setShift(true)}>
            Registrate
          </p>
        </div>
        <h1 className={styles.h1}>{!shift ? 'Crea una cuenta' : 'Ingresa con tus datos'}</h1>
        {!shift ? (
          <form className={styles.boxForm}>
            <input className={styles.contact} type='text' name='email' placeholder='Ingresa tu email...' onChange={inputHandler} defaultValue={user.email} />
            <input className={styles.contact} type='password' name='password' placeholder='Ingresa tu contraseña...' onChange={inputHandler} defaultValue={user.password} />
          </form>
        ) : (
          <form className={styles.boxForm}>
            <div className={styles.nameContent}>
              <input className={styles.name} type='text' name='firstName' placeholder='Ingresa tu nombre...' onChange={inputHandler} defaultValue={user.firstName} />
              <input className={styles.name} type='text' name='lastName' placeholder='Ingresa tu apellido...' onChange={inputHandler} defaultValue={user.lastName} />
            </div>
            <div className={styles.contactContent}>
              <input className={styles.contact} type='text' name='email' placeholder='Ingresa tu email...' onChange={inputHandler} defaultValue={user.email} />
              <input className={styles.contact} type='password' name='password' placeholder='Crea una contraseña...' onChange={inputHandler} defaultValue={user.password} />
              <input className={styles.contact} type='password' name='repPass' placeholder='Repite la contraseña...' onChange={inputHandler} defaultValue={user.repPass} />
              <input className={styles.contact} type='file' name='src' placeholder='Agregá una foto de perfil' onChange={inputHandler} defaultValue={user.src} />
            </div>
          </form>
        )}
        <span className={styles.submitButton} onClick={submit}>
          Enviar!
        </span>
        <GoogleLogin
          clientId='700780098168-b35ln15khokfkbats4tm4sl7cbcv3bup.apps.googleusercontent.com'
          buttonText='or use Google acaunt'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>


    </main>
  )
}


const mapDispatchToProps = {
  createUser: userActions.createUser,
  logUser: userActions.logUser,

}

export default connect(null, mapDispatchToProps)(SignForm)
