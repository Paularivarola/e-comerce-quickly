import { connect } from "react-redux"
import styles from '../styles/signup.module.css'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import userActions from "../redux/actions/userActions"

const SignUp = (props) => {
    const [user, setUser] = useState({ name: null, lastName: null, mail: null, pass: null, repPass: null })
    const [shift, setShift] = useState(false)

    const responseGoogle = (googleRegister) => {
        let googleUser = {
            name: googleRegister.profileObj.givenName,
            lastName: googleRegister.profileObj.familyName,
            mail: googleRegister.profileObj.email,
            profilePicture: googleRegister.profileObj.imageUrl,
            pass: googleRegister.profileObj.googleId,
            google: true,
        }
        if (!shift) {
            signUp(googleUser)
        } else {
            signIn(googleUser)
        }
    }

    const inputHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!shift) {
            if (!user.mail.includes("@") || user.pass === null) {
                alert("Todos los campos son obligatorios")
            }
            signIn(user)
        } else {
            if (Object.keys(user).some((property) => user[property] === null) ||
                !user.mail.includes("@")) {
                alert("Todos los campos son obligatorios")
                return false
            }
            signUp(user)
        }
    }

    const signUp = async (sendUser) => {
        console.log("sign Up!!", sendUser)
        await props.createUser(sendUser)
    }

    const signIn = async (sendUser) => {
        console.log("sign In!!", sendUser)
        await props.logUser(sendUser)
    }

    return (
        <main className={styles.mainSign}>
            <div className={styles.boxDiv}>
                <div className={styles.boxButton}>
                    <p className={!shift ? styles.activeButton : styles.button}
                        onClick={() => setShift(false)}>Ingresá</p>
                    <p className={shift ? styles.activeButton : styles.button}
                        onClick={() => setShift(true)}>Registrate</p>
                </div>
                <h1 className={styles.h1}>{!shift ? "Crea una cuenta" : "Ingresa con tus datos"}</h1>
                {!shift ?
                    <form className={styles.boxForm}>
                        <input className={styles.contact} type="text" name="mail" placeholder="Ingresa tu email..."
                            onChange={inputHandler} defaultValue={user.mail} />
                        <input className={styles.contact} type="password" name="pass" placeholder="Ingresa tu contraseña..."
                            onChange={inputHandler} defaultValue={user.pass} />
                    </form>
                    :
                    <form className={styles.boxForm}>
                        <div className={styles.nameContent}>
                            <input className={styles.name} type="text" name="name" placeholder="Ingresa tu nombre..."
                                onChange={inputHandler} defaultValue={user.name} />
                            <input className={styles.name} type="text" name="lastName" placeholder="Ingresa tu apellido..."
                                onChange={inputHandler} defaultValue={user.lastName} />
                        </div>
                        <div className={styles.contactContent}>
                            <input className={styles.contact} type="text" name="mail" placeholder="Ingresa tu email..."
                                onChange={inputHandler} defaultValue={user.mail} />
                            <input className={styles.contact} type="password" name="pass" placeholder="Crea una contraseña..."
                                onChange={inputHandler} defaultValue={user.pass} />
                            <input className={styles.contact} type="password" name="repPass" placeholder="Repite la contraseña..."
                                onChange={inputHandler} defaultValue={user.repPass} />
                        </div>
                    </form>
                }
                <p className={styles.submitButton} onClick={submit}>Enviar!</p>
                <GoogleLogin
                    clientId="700780098168-b35ln15khokfkbats4tm4sl7cbcv3bup.apps.googleusercontent.com"
                    buttonText="or use Google acaunt"
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

export default connect(null, mapDispatchToProps)(SignUp)