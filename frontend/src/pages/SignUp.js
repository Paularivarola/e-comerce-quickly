import { Link } from 'react-router-dom'
import styles from '../styles/signup.module.css'
import { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'

const SignUp = () => {
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
        // if(Object.keys(user).some((property) => user[property] === null) ||
        //     !user.mail.includes("@")){
        //     alert("llenar los compos vacios!")
        //    return false
        //}
        if (!shift) {
            signUp(user)
        } else {
            signIn(user)
        }
    }

    const signUp = (sendUser) => {
        console.log("sign Up!!", sendUser)
    }

    const signIn = (sendUser) => {
        console.log("sign In!!", sendUser)
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
                        <input className={styles.contact} type="text" name="email" placeholder="Ingresa tu email..." required onChange={inputHandler} />
                        <input className={styles.contact} type="password" name="pass" placeholder="Ingresa tu contraseña..." required onChange={inputHandler} />
                    </form>
                    :
                    <form className={styles.boxForm}>
                        <div className={styles.nameContent}>
                            <input className={styles.name} type="text" name="name" placeholder="Ingresa tu nombre..." required onChange={inputHandler} />
                            <input className={styles.name} type="text" name="lastName" placeholder="Ingresa tu apellido..." required onChange={inputHandler} />
                        </div>
                        <input className={styles.contact} type="text" name="email" placeholder="Ingresa tu email..." required onChange={inputHandler} />
                        <input className={styles.contact} type="password" name="pass" placeholder="Crea una contraseña..." required onChange={inputHandler} />
                        <input className={styles.contact} type="password" name="repPass" placeholder="Repite la contraseña..." required onChange={inputHandler} />
                    </form>
                }
                <p className={styles.p} onClick={submit}>Enviar!</p>
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

export default SignUp