import styles from '../styles/order.module.css'
import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import Card2 from '../components/CheckoutTESTING'
import CardTost from './CardTost'

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
    if (!userData?.addresses?.length) return setCardTost({ time: 1500, icon: 'error', text: 'Debes seleccionar un método de pago', view: true })
    if (!userData?.paymentCards?.length) return setCardTost({ time: 1500, icon: 'error', text: 'Debes seleccionar una dirección', view: true })
    setCardTost({ time: 1500, icon: 'success', text: 'Está todo en orden, ya puedes pagar!', view: true })
    setPay(true)
  }
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })

  return (
    <div className={styles.mainOrder}>
      <div className={styles.OrderContainer}>
        <h4 className={styles.orderNumber}>
          <span className={styles.title}>Nro de orden:</span> {userData ? userData?._id + '_ord' + userData?.ordersId?.length : '.-'}{' '}
        </h4>
        <div className={styles.table}>
          <div className={styles.head}>
            <div className={styles.title}>Cantidad</div>
            <div className={styles.menu}>Menu</div>
            <div className={styles.title}>Precio Unit.</div>
          </div>
          {props?.cart?.map((cartItem, index) => (
            <div key={'cartItem' + index} className={styles.bodyOrder}>
              <div className={styles.data}>{cartItem.totalAmount}</div>
              <div className={styles.dataMenu}>{cartItem.productId.name}</div>
              <div className={styles.data}>{formatter.format(cartItem.unitaryPrice)}</div>
            </div>
          ))}
        </div>
        <div className={styles.totalPrice}>
          <p>
            <span>Total:</span> {formatter.format(props.cart.reduce((acc, item) => acc + item.totalPrice, 0))}
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
            <span>{pay ? <Card2 index={props.active.card} deliveryAddress={props.deliveryAddress} {...props} /> : <button onClick={() => sendForm()}>Confirmar</button>}</span>
          </span>
        </div>
      </div>
      {cardTost.view && <CardTost properties={cardTost} setCardTost={setCardTost} />}
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
