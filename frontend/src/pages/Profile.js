import Data from '../components/Data'
import History from '../components/History'
import Favorites from '../components/Favorites'
import styles from '../styles/profile.module.css'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Profile = () => {
  const [updateUser, setUpdateUser] = useState({})
  const [createCard, setCreateCard] = useState({})
  const [view, setView] = useState(<Data setCard={setCreateCard} setUser={setUpdateUser} />)

  const cleanInputs = (page) => {
    setUpdateUser({})
    setCreateCard({})
    setView(page)
  }

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
      setView(<Data setCard={setCreateCard} setUser={setUpdateUser} />)
    } else if (comp === 'fav') {
      const user = Object.values(updateUser).some((user) => user !== '')
      const card = Object.values(createCard).some((card) => card !== '')
      if (user || card) {
        confirm(<Favorites />)
        return false
      }
      setView(<Favorites />)
    } else {
      const user = Object.values(updateUser).some((user) => user !== '')
      const card = Object.values(createCard).some((card) => card !== '')
      if (user || card) {
        confirm(<History />)
        return false
      }
      setView(<History />)
    }
  }

  return (
    <>
      <div className='containerButtonCheck'>
        <button styles={styles.buttonCheck} onClick={() => selectComponent('data')}>
          Datos
        </button>
        <button styles={styles.buttonCheck} onClick={() => selectComponent('fav')}>
          Favoritos
        </button>
        <button styles={styles.buttonCheck} onClick={() => selectComponent('his')}>
          Historial
        </button>
      </div>
      <div className='containerRenderView'>
        <div className='renderView'>{view}</div>
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

export default Profile
