import styles from '../styles/checkOut.module.css'
import styles2 from '../styles/profile.module.css'
import styles3 from '../styles/products.module.css'
import styles4 from '../styles/data.module.css'
import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import Card2 from '../components/CheckoutTESTING'
import CardTost from '../components/CardTost'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { IoMdAddCircle } from 'react-icons/io'
import Addresses from '../components/Addresses'
import Payment from '../components/Payment'
import NavLateral from '../components/NavLateral'
import Order from '../components/Order'
import Preloader from '../components/Preloader'



const CheackOut = (props) => {

  let userData = props.userData
  const [delivery, setDelivery] = useState('')
  const [pay, setPay] = useState(false)
  const [viewAddress, setViewAddress] = useState('')
  const [viewCard, setViewCard] = useState('')
  const [active, setActive] = useState({ card: 0, address: 0 })
  const [view, setView] = useState(props.match.params.page)
  const changeDelivery = (delivery) => {
    setDelivery(delivery)
    setViewAddress('')
    setViewCard('')
  }
  const [user, setUser] = useState({
    firstName: userData?.data.firstName || '',
    lastName: userData?.data.lastName || '',
    email: userData?.data.email || '',
  })
  const [addAddress, setAddAddress] = useState({
    alias: '',
    street: '',
    number: '',
    neighborhood: '',
  })
  useEffect(() => {
    setUser({
      firstName: userData?.data.firstName || '',
      lastName: userData?.data.lastName || '',
      email: userData?.data.email || '',
    })
  }, [userData])


  const neighborhoodArray = ['Lomas de Zamora', 'Palermo', 'Bandfield', 'Temperley', 'Lanús', 'Glew', 'Monte Grande']
  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const formProfile = (
    <div className={styles.containFormDeliveryHeader}>
      <div className={styles.FormDeliveryHeader}>
        <input type='text' placeholder='Nombre' defaultValue={userData?.data.firstName} name='firstName' onChange={inputHandler} />
        <input type='text' placeholder='Apellido' defaultValue={userData?.data.lastName} name='lastName' onChange={inputHandler} />
      </div>
      <div className={styles.FormDeliveryBody}>
        <input type='text' placeholder='Email' defaultValue={userData?.data.email} name='email' onChange={inputHandler} />
        <input type='text' placeholder='Telofono (opcional)' onChange={inputHandler} />
      </div>
    </div>
  )

  const inputHandlerAddress = (e) => {
    setAddAddress({
      ...addAddress,
      [e.target.name]: e.target.value,
    })
  }
  const formAddress = (
    <div className={styles.containFormAddress}>
      <div className={styles.contiainInputsHeader}>
        <div className={styles.FormAddressHeader}>
          <input className={styles.inputAddress} name='street' type='text' placeholder='Direccion' onChange={inputHandlerAddress} />
        </div>
        <div>
          <input className={styles.inputNumber} name='number' type='Number' placeholder='Numero' onChange={inputHandlerAddress} />
        </div>
      </div>
      <div className={styles.FormAddressBody}>
        <input type='text' placeholder='Alias/Referencia' name='alias' onChange={inputHandlerAddress} />
        <select name='neighborhood' onChange={inputHandlerAddress}>
          <option>seleciona tu localidad perro</option>
          {neighborhoodArray.map((neigh, index) => (
            <option key={index}>{neigh}</option>
          ))}
        </select>
      </div>
    </div>
  )

  const changeViewAddress = (action) => {
    setViewAddress(action)
  }
  const changeViewCard = (action) => {
    setViewCard(action)
  }
  const card = (
    <div>
      <input type='text' placeholder='tarjeta' />
      <input type='text' placeholder='code' />
    </div>
  )

  const cardViewPage = (
    <div>
      <div className={styles.containButtonsDelivery}>
        {!userData ? (
          <button onClick={() => changeViewCard('add')}>Agregar Tarjeta</button>
        ) : (
          <button onClick={() => changeViewCard('get')}>Mi Billetera</button>
        )}
      </div>
      {viewCard === '' ? (
        <div className={styles.tittleSelect}>
          <h1>Selecciona un metodo para el pago</h1>
        </div>
      ) : viewCard === 'add' ? (
        card
      ) : (
        <div className={styles.containAddressCard}>
          <Payment user={userData?.data} setActive={setActive} active={active} />
        </div>
      )}
    </div>
  )

  const viewCardPage = (
    <div>
      <div className={styles.containButtonsDelivery}>
        {!userData ? (
          <button onClick={() => changeViewAddress('add')}>Agregar Direccion</button>
        ) : (
          <button onClick={() => changeViewAddress('get')}>Mis Direcciones</button>
        )}
      </div>
      {viewAddress === '' ? (
        <div className={styles.tittleSelect}>
          <h1>Selecciona un metodo para la direccion</h1>
        </div>
      ) : viewAddress === 'add' ? (
        formAddress
      ) : (
        <div className={styles.containAddressCard}>
          <Addresses user={userData?.data} setActive={setActive} active={active} />
        </div>
      )}
      {cardViewPage}
    </div>
  )

  const [cardTost, setCardTost] = useState({
    time: '',
    icon: '',
    text: '',
    view: false,
  })

  const emailRef = useRef()
  const sendForm = () => {
    if (emailRef.current?.value !== user.email) return alert('tenes el mail mal pa')
    if (!user) {
      let verificationAddress = Object.values(addAddress).some((add) => add === '')
      let verificationUser = Object.values(user).some((user) => user === '')
      if (delivery === 'send') {
        if (verificationUser || verificationAddress)
          return setCardTost({ time: 1500, icon: 'error', text: 'Complete todos los campos', view: true })
      } else {
        if (verificationUser) return setCardTost({ time: 1500, icon: 'error', text: 'Complete todos los campos', view: true })
      }
    }
    setCardTost({ time: 1500, icon: 'success', text: 'Enviado, todo ok', view: true })
    setPay(true)
  }


useEffect(() => {
    setView(props.match.params.page)
  }, [props.match.params])

  const navItems = [
    { page: 'checkout', comp: 'order', name: 'Mi pedido' },
    {
      page: 'checkout',
      comp: 'addresses',
      name: 'Punto de entrega',
    },
    {
      page: 'checkout',
      comp: 'payment',
      name: 'Metodo de pago',
    },
  ]

  const [modal, setModal] = useState(false)
  const [cardModal, setCardModal] = useState(false)
  
  return (
    <div className={styles.mainCheckout}>
      {cardTost.view && <CardTost properties={cardTost} setCardTost={setCardTost} />}
      <div className={styles3.categories}>
        <div className={styles3.categoriesList}>
          <BsFillBagCheckFill style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }} />
          <p className={styles3.categoriesTitle}> CheckOut</p>
        </div>
        <div className={styles3.boxShop}>
          <p className={styles3.welcome}>Buena elección {props.user && props.user.firstName}!</p>
          {(props.history.location.pathname === '/checkout/payment' || props.history.location.pathname === '/checkout/addresses') && (
            <div className={styles.btnAddress}>
              <IoMdAddCircle style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }}/>
              <span onClick={() => (props.history.location.pathname === '/checkout/payment' ? setCardModal(true) : setModal(!modal))}>
                Agregar {props.history.location.pathname === '/checkout/payment' ? 'tarjeta' : 'dirección'}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.boxChekOut}>
        <NavLateral navItems={navItems}/>
        <div className={styles2.containerRenderView}>
          <div className={styles2.renderView}>
              {/* <Preloader /> */}
              <div className={styles4.containerData}>
                <div className={styles4.containAllProfile}>
                  {view === 'addresses' ? (
                    <Addresses user={props.userData?.data} modal={modal} setModal={setModal} />
                  ) : view === 'payment' ? (
                    <Payment user={props.userData?.data} cardModal={cardModal} setCardModal={setCardModal} />
                  ): <Order user={props.userData?.data} modal={modal} setModal={setModal}/>}
                </div>
              </div>
          </div>
      </div>
    </div>
  </div>

    // <div className={styles.containAll}>
    //   <div className={styles.containForm}>
    //     <div className={styles.containButtonsDelivery}>
    //       <p>¿Cómo despachamos tu envio?</p>
    //       <div className={styles.buttonsBox}>
    //         <button onClick={() => changeDelivery('withdraw')}>Retirar</button>
    //         <button onClick={() => changeDelivery('send')}>Delivery</button>
    //       </div>
    //     </div>
    //     <div className={styles.containFormDelivery}>
    //       {!userData && <h3 className={styles.titleLogIn}>si tenes cuenta, ingresa</h3>}
    //       {delivery !== '' && formProfile}
    //       {delivery === 'withdraw' ? (
    //         <>
    //           <div className={styles.containMapWithdraw}>
    //             <h1>aca va el mapa perri</h1>
    //           </div>
    //           {userData ? (
    //             cardViewPage
    //           ) : (
    //             <div className={styles.containCardSend}>
    //               <h2>Ingrese su tarjeta</h2>
    //               {card}
    //             </div>
    //           )}
    //         </>
    //       ) : delivery === 'send' ? (
    //         <div>
    //           {userData ? (
    //             viewCardPage
    //           ) : (
    //             <>
    //               {formAddress}
    //               <div className={styles.containCardSend}>
    //                 <h2>Ingrese su tarjeta</h2>
    //                 {card}
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       ) : (
    //         <div className={styles.tittleSelect}>
    //           <h1>Ingrese por favor como retirar</h1>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className={styles.containFormSend}>
    //     <div className={styles.containList}>
    //       lista de pedido
    //     </div>
    //     <div className={styles.containSend}>
    //       <div className={styles.containInfoSend}>
    //         <div className={styles.containInfoName}>
    //           <h3>Nombre: {user.firstName}</h3>
    //           <h3>Apellido: {user.lastName}</h3>
    //         </div>
    //         <div className={styles.containInfoinput}>
    //           <h3>Confirme su email</h3>
    //           <input type='text' placeholder='Email' name='email' ref={emailRef} className={styles.inputConfirmEmail} />
    //         </div>
    //       </div>
    //       <div className={styles.containButtonSend}>
    //         <span>{pay ? <Card2 index={active.card} /> : <button onClick={() => sendForm()}>Confirmar</button>}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    user: state.users.user
  }
}

const mapDispachToProps = {}

export default connect(mapStateToProps, mapDispachToProps)(CheackOut)
