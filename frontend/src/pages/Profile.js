import Data from '../components/Data'
import History from '../components/History'
import Favorites from '../components/Favorites'
import NavLateral from '../components/NavLateral'
import styles from '../styles/profile.module.css'
import styles3 from '../styles/products.module.css'
import { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

import { BsPersonLinesFill } from "react-icons/bs"
import { MdShoppingCart } from 'react-icons/md'

const Profile = (props) => {
  const [formConfirm, setFormConfirm] =useState({})
  const [view, setView] = useState('')
  const [subComp, setSubComp] = useState('')
  
  useEffect(() => {
    let verification = Object.values(formConfirm).some((input) => input !== "")
    if(verification){
      alert("todo mal")
    }
    let page = props.match.params.page
    setView(
      page === 'fav' ? (
        <Favorites favorites={props.userData?.favouriteProductsId} setFormConfirm={setFormConfirm}/>
      ) : page === 'his' ? (
        <History orders={props.userData?.ordersId} setFormConfirm={setFormConfirm}/>
      ) : (
        <Data user={props.userData?.data} subComp={subComp} setFormConfirm={setFormConfirm}/>
      )
    )
  }, [props.userData, props.match.params])

  const selectComponent = (comp) => {
    if (comp === 'acc') {
      setView(<Data user={props.userData?.data} setFormConfirm={setFormConfirm}/>)
    } else if (comp === 'fav') {
      setView(<Favorites favorites={props.userData?.favouriteProductsId} setFormConfirm={setFormConfirm}/>)
    } else {
      setView(<History orders={props.userData?.ordersId} setFormConfirm={setFormConfirm}/>)
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
      <div className={styles.mainProfile}>
        <div className={styles3.categories}>
          <div className={styles3.categoriesList}>
            <BsPersonLinesFill style={{ color: '#fe6849', fontSize: '1.5em', marginRight: '5%' }} />
            <p className={styles3.categoriesTitle}> Mi cuenta</p>
          </div>
          <div className={styles3.boxShop}>
            <p className={styles3.welcome}>Hola {props.user && props.user.firstName}, que bueno verte por acá!</p>
          </div>
        </div>
        <div className={styles.boxProfile}>
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
