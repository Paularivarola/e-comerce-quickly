import styles from '../styles/order.module.css'
import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import Card2 from '../components/CheckoutTESTING'

const Order = (props) => {
  let userData = props.userData
  const [pay, setPay] = useState(false)
  // const [view, setView] = useState(props.match.params.page)

  const [user, setUser] = useState({
    firstName: userData?.data.firstName || '',
    lastName: userData?.data.lastName || '',
    email: userData?.data.email || '',
  })
  useEffect(() => {
    setUser({
      firstName: userData?.data.firstName || '',
      lastName: userData?.data.lastName || '',
      email: userData?.data.email || '',
    })
  }, [userData])

  const [cardTost, setCardTost] = useState({
    time: '',
    icon: '',
    text: '',
    view: false,
  })

  const emailRef = useRef()
  const sendForm = () => {
    if (emailRef.current?.value !== user.email) return setCardTost({ time: 1500, icon: 'error', text: 'Confirmá el email pa', view: true })

    setCardTost({ time: 1500, icon: 'success', text: 'Enviado, todo ok', view: true })
    setPay(true)
  }

  return (
    <div className={styles.mainOrder}>
      <div className={styles.OrderContainer}>
        <h4 className={styles.orderNumber}>
          <pan className={styles.title}>Nro de orden:</pan> 000{' '}
        </h4>
        <div className={styles.table}>
          <div className={styles.head}>
            <div className={styles.title}>Cantidad</div>
            <div className={styles.menu}>Menu</div>
            {/* <div className={styles.title}>Extras</div> */}
            <div className={styles.title}>Precio Unit.</div>
          </div>
          <div className={styles.bodyOrder}>
            <div className={styles.data}>cantidad</div>
            <div className={styles.data}>nombre</div>
            {/* <div className={styles.data}>extras</div> */}
            <div className={styles.data}>precio</div>
          </div>
          <div className={styles.bodyOrder}>
            <div className={styles.data}>cantidad</div>
            <div className={styles.data}>nombre</div>
            {/* <div className={styles.data}>extras</div> */}
            <div className={styles.data}>precio</div>
          </div>
          <div className={styles.bodyOrder}>
            <div className={styles.data}>cantidad</div>
            <div className={styles.data}>nombre</div>
            {/* <div className={styles.data}>extras</div> */}
            <div className={styles.data}>precio</div>
          </div>
        </div>
        <div className={styles.totalPrice}>
          <p>
            <span>Total:</span> 000
          </p>
        </div>
      </div>
      <div className={styles.confirmContainer}>
        <div className={styles.containInfoSend}>
          <div className={styles.containInfoName}>
            <h3 className={styles.userData}>
              <span>Nombre: </span>
              {user.firstName}
            </h3>
            <h3 className={styles.userData}>
              <span>Apellido: </span>
              {user.lastName}
            </h3>
          </div>
          <div className={styles.containInfoinput}>
            <h3 className={styles.userData}>
              <span>Confirme su email</span>
            </h3>
            <input className={styles.input} type='text' placeholder='Email' name='email' ref={emailRef} />
          </div>
        </div>
        <div className={styles.containButtonSend}>
          <span>
            <span>{pay ? <Card2 index={0} /> : <button onClick={() => sendForm()}>Confirmar</button>}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    user: state.users.user,
    manageCart: state.users.manageCart,
  }
}

export default connect(mapStateToProps)(Order)
