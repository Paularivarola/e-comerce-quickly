import styles from '../styles/checkOut.module.css'
import styles2 from '../styles/profile.module.css'
import styles3 from '../styles/products.module.css'
import styles4 from '../styles/data.module.css'
import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import CardTost from '../components/CardTost'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { IoMdAddCircle } from 'react-icons/io'
import Addresses from '../components/Addresses'
import NavLateral from '../components/NavLateral'
import Order from '../components/Order'
import Preloader from '../components/Preloader'

const CheackOut = (props) => {
  const [view, setView] = useState(props.match.params.page)
  const [active, setActive] = useState({ card: 0, address: 0 })

  const [cardTost, setCardTost] = useState({
    time: '',
    icon: '',
    text: '',
    view: false,
  })

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
          {(props.history.location.pathname === '/checkout/payment' ||
            props.history.location.pathname === '/checkout/addresses') && (
            <div className={styles.btnAddress}>
              <IoMdAddCircle
                style={{
                  color: '#fe6849',
                  fontSize: '1.5em',
                  marginRight: '5%',
                }}
              />
              <span onClick={() => setModal(true)}>
                Agregar {props.history.location.pathname === '/checkout/payment' ? 'tarjeta' : 'dirección'}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.boxChekOut}>
        <NavLateral navItems={navItems} />
        <div className={styles2.containerRenderView}>
          <div className={styles2.renderView}>
            {/* <Preloader /> */}
            <div className={styles4.containerData}>
              <div className={styles4.containAllProfile}>
                {view === 'addresses' || view === 'payment' ? (
                  <Addresses
                    active={active}
                    setActive={setActive}
                    user={props.userData?.data}
                    modal={modal}
                    setModal={setModal}
                    view={view === 'addresses'}
                  />
                ) : (
                  <Order active={active} user={props.userData?.data} cart={props?.cart} {...props} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    user: state.users.user,
    cart: state.users.cart,
  }
}

const mapDispachToProps = {}

export default connect(mapStateToProps, mapDispachToProps)(CheackOut)
