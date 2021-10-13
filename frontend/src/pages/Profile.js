// import Data from '../components/Data'
import styles2 from '../styles/data.module.css'
import PersonalData from '../components/PersonalData'
import ChangePassword from '../components/ChangePassword'
import Addresses from '../components/Addresses'
import History from '../components/History'
import Favorites from '../components/Favorites'
import NavLateral from '../components/NavLateral'
import Preloader from '../components/Preloader'
import styles from '../styles/profile.module.css'
import styles3 from '../styles/products.module.css'
import { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { BsPersonLinesFill } from 'react-icons/bs'
import { IoMdAddCircle } from 'react-icons/io'

const Profile = (props) => {
  const [formConfirm, setFormConfirm] = useState({})
  const [view, setView] = useState(props.match.params.page)
  const [cardTost, setCardTost] = useState({
    time: '',
    icon: '',
    text: '',
    view: false,
  })

  useEffect(() => {
    let verification = Object.values(formConfirm).some((input) => input !== '')
    if (verification) {
      alert('todo mal')
    }
    setView(props.match.params.page)
  }, [props.match.params])

  const navItems = [
    { page: 'profile', comp: 'fav', name: 'Favoritos' },
    { page: 'profile', comp: 'his', name: 'Mis Pedidos' },
    {
      page: 'profile',
      comp: 'data',
      name: 'Mi cuenta',
      desplegable: [
        { comp: 'data', name: 'Datos Personales' },
        { comp: 'password', name: 'Cambiar Contraseña' },
        { comp: 'addresses', name: 'Direcciones' },
        { comp: 'payment', name: 'Métodos de Pago' },
      ],
    },
  ]
  const [modal, setModal] = useState(false)
  return (
    <div className={styles.mainProfile}>
      <div className={styles3.categories}>
        <div className={styles3.categoriesList}>
          <BsPersonLinesFill
            style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }}
          />
          <p className={styles3.categoriesTitle}> Mi cuenta</p>
        </div>
        <div className={styles3.boxShop}>
          <p className={styles3.welcome}>
            Hola {props.user && props.user.firstName}, que bueno verte por acá!
          </p>
          {(props.history.location.pathname === '/profile/payment' ||
            props.history.location.pathname === '/profile/addresses') && (
            <div className={styles.btnAddress}>
              <IoMdAddCircle
                style={{
                  color: '#fe6849',
                  fontSize: '1.5em',
                  marginRight: '5%',
                }}
              />
              <span onClick={() => setModal(true)}>Agregar</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.boxProfile}>
        <NavLateral navItems={navItems} />
        <div className={styles.containerRenderView}>
          <div className={styles.renderView}>
            {!props.userData ? (
              <Preloader />
            ) : view === 'fav' ? (
              <Favorites
                favorites={props.userData?.favouriteProductsId}
                setFormConfirm={setFormConfirm}
              />
            ) : view === 'his' ? (
              <History
                orders={props.userData?.ordersId}
                setFormConfirm={setFormConfirm}
              />
            ) : (
              <div className={styles2.containerData}>
                <div className={styles2.containAllProfile}>
                  {view === 'data' ? (
                    <PersonalData
                      user={props.userData?.data}
                      setCancelForm={setFormConfirm}
                    />
                  ) : view === 'password' ? (
                    <ChangePassword
                      user={props.userData?.data}
                      setCancelForm={setFormConfirm}
                    />
                  ) : (
                    <Addresses
                      user={props.userData?.data}
                      setCancelForm={setFormConfirm}
                      modal={modal}
                      setModal={setModal}
                      view={view === 'addresses'}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Toaster
          containerStyle={{
            top: 80,
            left: 20,
            bottom: 20,
            right: 20,
          }}
          toastOptions={{
            duration: 1500,
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    user: state.users.user,
  }
}
const mapDispachToProps = {}

export default connect(mapStateToProps, mapDispachToProps)(Profile)
