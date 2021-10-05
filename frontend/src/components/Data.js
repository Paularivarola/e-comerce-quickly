import { useState } from 'react'

const Data = () => {
  const [updateUser, setUpdateUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    src: '',
  })
  const [createTarget, setCreateTarget] = useState({
    name: '',
    lastName: '',
    expirationDate: '',
    code: '',
    DNI: '',
  })

  const [viewUser, SetViewUser] = useState('profile')
  const [viewCard, setViewCard] = useState('')
  const inputHandlerProfile = (e) => {
    console.log(e)
  }

  const inputHandlerCard = (e) => {
    console.log(e)
  }

  return (
    <div className='containerData'>
      <div className='containerProfile'>
        <div className='imageProfile' style={{ backgroundImage: 'url("/assets/profile.png")' }}></div>
        <h1>NOMBRE DE LA PERSONA</h1>
        <div className='buttonsProfile'>
          <button onClick={() => SetViewUser('profile')}>Perfil</button>
          <button onClick={() => SetViewUser('cards')}>Tarjetas</button>
        </div>
      </div>
      <div className='containAllProfile'>
        {viewUser === 'profile' ? (
          <div className='containerDateProfile'>
            <form>
              <h2>Tus datos principales</h2>
              <div className='inputsDataUser'>
                <input type='text' placeholder='Nombre' autoComplete='nope' name='name' onChange={inputHandlerProfile} />
              </div>
              <div className='inputsDataUser'>
                <input type='text' placeholder='Apellido' autoComplete='nope' name='lastName' onChange={inputHandlerProfile} />
              </div>
              <div className='inputsDataUser'>
                <input type='text' placeholder='Correo' autoComplete='nope' name='email' onChange={inputHandlerProfile} />
              </div>
              <div className='inputsDataUser'>
                <input type='password' placeholder='Contraseña' autoComplete='nope' name='password' onChange={inputHandlerProfile} />
              </div>
              <div className='inputsDataUser'>
                <input type='text' placeholder='Imagen' autoComplete='nope' name='src' onChange={inputHandlerProfile} />
              </div>
            </form>
          </div>
        ) : (
          <div className='containerCardProfile'>
            {viewCard === '' && (
              <>
                <div className='imageAddViewCard' onClick={() => setViewCard('viewCard')} style={{ backgroundImage: 'url("/assets/billetera.png")' }}></div>
                <div className='imageAddViewCard' onClick={() => setViewCard('addCard')} style={{ backgroundImage: 'url("/assets/agregar.png")' }}></div>
              </>
            )}
            {viewCard === 'addCard' ? (
              <>
                <form>
                  <h2>Agregar Tarjeta</h2>
                  <div className='headerInputCard'>
                    <div className='inputsDataUser'>
                      <input type='text' placeholder='Numero de tarjeta' autoComplete='nope' onChange={inputHandlerCard} />
                    </div>
                  </div>
                  <div className='bodyInputCard'>
                    <div>
                      <div className='inputsDataUser'>
                        <input type='text' placeholder='Nombre' autoComplete='nope' onChange={inputHandlerCard} name='name' />
                      </div>
                      <div className='inputsDataUser'>
                        <input type='text' placeholder='Apellido' autoComplete='nope' onChange={inputHandlerCard} name='lastName' />
                      </div>
                    </div>
                    <div>
                      <div className='inputsDataUser'>
                        <input type='text' placeholder='Fecha de expiracion' autoComplete='nope' onChange={inputHandlerCard} name='expirationDate' />
                      </div>
                      <div className='inputsDataUser'>
                        <input type='password' placeholder='Código de seguridad' autoComplete='nope' onChange={inputHandlerCard} name='code' />
                      </div>
                    </div>
                  </div>
                  <div className='footerInputCard'>
                    <div className='inputsDataUser'>
                      <input type='text' placeholder='DNI del titular' autoComplete='nope' onChange={inputHandlerCard} name='DNI' />
                    </div>
                  </div>
                </form>
                <div className='imageCard' style={{ backgroundImage: 'url("/assets/tarjeta.png")' }}></div>
                <div className='containImageBack'>
                  <div className='imageBack' style={{ backgroundImage: 'url("/assets/volver.png")' }} onClick={() => setViewCard('')}></div>
                </div>
              </>
            ) : (
              viewCard === 'viewCard' && (
                <div>
                  <h1>hola esto anda gegegegegege aca van las tarjetas</h1>
                  <div className='containImageBack'>
                    <div className='imageBack' style={{ backgroundImage: 'url("/assets/volver.png")' }} onClick={() => setViewCard('')}></div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Data
