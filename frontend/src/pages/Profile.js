// import Data from '../components/Data'
import styles2 from '../styles/data.module.css'
import PersonalData from '../components/PersonalData'
import ChangePassword from '../components/ChangePassword'
import Addresses from '../components/Addresses'
import Payment from '../components/Payment'
import Notifications from '../components/Notifications'
import History from '../components/History'
import Favorites from '../components/Favorites'
import NavLateral from '../components/NavLateral'
import styles from '../styles/profile.module.css'
import { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const Profile = (props) => {
  const [formConfirm, setFormConfirm] = useState({})
  const [view, setView] = useState(props.match.params.page)

  useEffect(() => {
    let verification = Object.values(formConfirm).some((input) => input !== '')
    if (verification) {
      alert('todo mal')
    }
    setView(props.match.params.page)
  }, [props.match.params])

  const navItems = [
    { comp: 'fav', name: 'Favoritos' },
    { comp: 'his', name: 'Mis Pedidos' },
    {
      comp: 'acc',
      name: 'Mi cuenta',
      desplegable: [
        { comp: 'personalData', name: 'Datos Personales' },
        { comp: 'changePassword', name: 'Cambiar Contraseña' },
        { comp: 'adresses', name: 'Direcciones' },
        { comp: 'payment', name: 'Métodos de Pago' },
        { comp: 'notif', name: 'Notificaciones' },
      ],
    },
  ]

  return (
    <div style={{ display: 'flex', padding: '0 2vw' }}>
      <NavLateral navItems={navItems} />
      <div className={styles.containerRenderView}>
        <div className={styles.renderView}>
          {view === 'fav' ? (
            <Favorites favorites={props.userData?.favouriteProductsId} setFormConfirm={setFormConfirm} />
          ) : view === 'his' ? (
            <History orders={props.userData?.ordersId} setFormConfirm={setFormConfirm} />
          ) : (
            <div className={styles2.containerData}>
              <div className={styles2.containAllProfile}>
                {view === 'personalData' || view === 'acc' ? (
                  <PersonalData user={props.userData?.data} setCancelForm={setFormConfirm} />
                ) : view === 'changePassword' ? (
                  <ChangePassword user={props.userData?.data} setCancelForm={setFormConfirm} />
                ) : view === 'adresses' ? (
                  <Addresses user={props.userData?.data} setCancelForm={setFormConfirm} />
                ) : view === 'payment' ? (
                  <Payment user={props.userData?.data} setCancelForm={setFormConfirm} />
                ) : (
                  <Notifications user={props.userData?.data} setCancelForm={setFormConfirm} />
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
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
  }
}
const mapDispachToProps = {}

export default connect(mapStateToProps, mapDispachToProps)(Profile)
