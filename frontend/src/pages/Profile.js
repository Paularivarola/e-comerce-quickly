import Data from '../components/Data'
import History from '../components/History'
import Favorites from '../components/Favorites'
import NavLateral from '../components/NavLateral'
import styles from '../styles/profile.module.css'
import { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const Profile = (props) => {
  const [view, setView] = useState('')
  const [subComp, setSubComp] = useState('')
  useEffect(() => {
    let page = props.match.params.page
    setView(
      page === 'fav' ? (
        <Favorites favorites={props.userData?.favouriteProductsId} />
      ) : page === 'his' ? (
        <History orders={props.userData?.ordersId} />
      ) : (
        <Data user={props.userData?.data} subComp={subComp} />
      )
    )
  }, [props.userData, props.match.params])

  const selectComponent = (comp) => {
    if (comp === 'acc') {
      setView(<Data user={props.userData?.data} />)
    } else if (comp === 'fav') {
      setView(<Favorites favorites={props.userData?.favouriteProductsId} />)
    } else {
      setView(<History orders={props.userData?.ordersId} />)
    }
  }

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
      <NavLateral selectComponent={selectComponent} setSubComp={setSubComp} navItems={navItems} />
      <div className={styles.containerRenderView}>
        <div className={styles.renderView}>{view}</div>
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
