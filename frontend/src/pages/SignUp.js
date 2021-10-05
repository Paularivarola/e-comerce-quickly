import { Link } from 'react-router-dom'
import styles from '../styles/signup.module.css'
import { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'

const SignUp = () => {
    const [user, setUser] = useState({name:null, lastName: null, mail:null, pass: null, repPass: null})
    const [shift,setShift] = useState(false)

    const responseGoogle = (googleRegister) => {
        let googleUser = {
            name: googleRegister.profileObj.givenName,
            lastName: googleRegister.profileObj.familyName,
            mail: googleRegister.profileObj.email,
            profilePicture: googleRegister.profileObj.imageUrl,
            pass: googleRegister.profileObj.googleId,
            google: true,
        }
        if(!shift){
            signUp(googleUser)
        }else{
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
        if(!shift){
            signUp(user)
        }else{
            signIn(user)
        }
    }

    const signUp = (sendUser) => {
        console.log("sign Up!!",sendUser)
    }

    const signIn = (sendUser) => {
        console.log("sign In!!",sendUser)
    }

    return (
        <main class={styles.mainSign}>
            <div class={styles.boxDiv}>
                <div class={styles.boxButton}>
                    <p class={!shift ? styles.activeButton : styles.button}
                        onClick={() => setShift(false)}>Ingresá</p>
                    <p class={shift ? styles.activeButton : styles.button}
                        onClick={() => setShift(true)}>Registrate</p>
                </div>
                <h1 class={styles.h1}>{!shift ? "Crea una cuenta" : "Ingresa con tus datos"}</h1>
                {!shift ? 
                    <form class={styles.boxForm}>
                        <input class={styles.contact} type="text" name="email" placeholder="Ingresa tu email..." required onChange={inputHandler}/>
                        <input class={styles.contact} type="password" name="pass" placeholder="Ingresa tu contraseña..." required onChange={inputHandler}/>
                    </form>
                :
                    <form class={styles.boxForm}>
                        <div class={styles.nameContent}>
                            <input class={styles.name} type="text" name="name" placeholder="Ingresa tu nombre..." required onChange={inputHandler}/>
                            <input class={styles.name} type="text" name="lastName" placeholder="Ingresa tu apellido..." required onChange={inputHandler}/>
                        </div>
                        <input class={styles.contact} type="text" name="email" placeholder="Ingresa tu email..." required onChange={inputHandler}/>
                        <input class={styles.contact} type="password" name="pass" placeholder="Crea una contraseña..." required onChange={inputHandler}/>
                        <input class={styles.contact} type="password" name="repPass" placeholder="Repite la contraseña..." required onChange={inputHandler}/>
                    </form>
                }
                <p class={styles.p} onClick={submit}>Enviar!</p>
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