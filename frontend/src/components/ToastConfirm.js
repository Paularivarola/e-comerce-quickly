import React from 'react'
import toast from 'react-hot-toast'

const toastConfirm = (acceptFunction) => {
  toast.custom((t) => (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'} containAlerts`}
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        padding: '20px 30px',
        borderRadius: '35px',
      }}
    >
      <div className='containerTextAlerts'>
        <p className=''>Perderas los cambios no guardados</p>
        <p className=''>estas seguro ?</p>
      </div>
      <div className='containButtonsAlerts'>
        <button
          onClick={() => acceptFunction()}
          style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '5px', cursor: 'pointer' }}
        >
          Si
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '5px', cursor: 'pointer' }}
        >
          No
        </button>
      </div>
    </div>
  ))
}

export default toastConfirm
