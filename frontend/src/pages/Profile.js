import Data from '../components/Data'
import History from '../components/History'
import Favorites from '../components/Favorites'
import styles from '../styles/profile.module.css'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useEffect } from 'react'


const Profile = (props) => {
  const [updateUser, setUpdateUser] = useState({})
  const [createCard, setCreateCard] = useState({})
  const [view, setView] = useState("")
  const cleanInputs = (page) => {
    setUpdateUser({})
    setCreateCard({})
    setView(page)
  }

  useEffect(() =>{
    setView(<Data user={props.userData?.data} setCard={setCreateCard} setUser={setUpdateUser} />)
  },[props.userData])
  const confirm = (page) => {
    return toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'} containAlerts`}
        style={{ display: 'flex', alignContent: 'center', alignItems: 'center', padding: '15px 15px', borderRadius: '25px' }}
      >
        <div className='containerTextAlerts'>
          <p className=''>Perderas los cambios no guardados</p>
          <p className=''>estas seguro ?</p>
        </div>
        <div className='containButtonsAlerts'>
          <button onClick={() => cleanInputs(page)} style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '5px' }}>
            Si
          </button>
          <button onClick={() => toast.dismiss(t.id)} style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '5px' }}>
            No
          </button>
        </div>
      </div>
    ))
  }

  const selectComponent = (component) => {
    let comp = component
    if (comp === 'data') {
      setView(<Data user={props.userData.data} setCard={setCreateCard} setUser={setUpdateUser} />)
    } else if (comp === 'fav') {
      const user = Object.values(updateUser).some((user) => user !== '')
      const card = Object.values(createCard).some((card) => card !== '')
      if (user || card) {
        confirm(<Favorites favorites={props.userData.favouriteProductsId} />)
        return false
      }
      setView(<Favorites favorites={props.userData.favouriteProductsId}/>)
    } else {
      const user = Object.values(updateUser).some((user) => user !== '')
      const card = Object.values(createCard).some((card) => card !== '')
      if (user || card) {
        confirm(<History orders={props.userData.ordersId} />)
        return false
      }
      setView(<History orders={props.userData.ordersId}/>)
    }
  }

  return (
    <>
      <div className={styles.containerButtonCheck}>
        <button styles={styles.buttonCheck} onClick={() => selectComponent('fav')}>
          Favoritos
        </button>
        <button styles={styles.buttonCheck} onClick={() => selectComponent('his')}>
          Historial
        </button>
        <button styles={styles.buttonCheck} onClick={() => selectComponent('data')}>
          Datos
        </button>
      </div>
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
    </>
  )
}

const mapStateToProps = (state) => {
  return{
    userData: state.users.userData
  }
}
const mapDispachToProps = {

}

export default connect(mapStateToProps, mapDispachToProps)(Profile) 
