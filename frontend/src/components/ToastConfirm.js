import React from 'react'
import toast from 'react-hot-toast'

const ToastConfirm = () => {
  return toast.custom((t) => (
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
          onClick={() => cleanInputs(name)}
          style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '5px' }}
        >
          Si
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '5px' }}
        >
          No
        </button>
      </div>
    </div>
  ))
}

export default ToastConfirm
