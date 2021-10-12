import styles from '../styles/order.module.css'
import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

const Order = (props) => {
        console.log(props)    


        let userData = props.userData
        const [delivery, setDelivery] = useState('')
        const [pay, setPay] = useState(false)
        const [viewAddress, setViewAddress] = useState('')
        const [viewCard, setViewCard] = useState('')
        const [active, setActive] = useState({ card: 0, address: 0 })
        // const [view, setView] = useState(props.match.params.page)
        const changeDelivery = (delivery) => {
        setDelivery(delivery)
        setViewAddress('')
        setViewCard('')
        }
        const [user, setUser] = useState({
        firstName: userData?.data.firstName || '',
        lastName: userData?.data.lastName || '',
        email: userData?.data.email || '',
        })
        const [addAddress, setAddAddress] = useState({
        alias: '',
        street: '',
        number: '',
        neighborhood: '',
        })
        useEffect(() => {
        setUser({
            firstName: userData?.data.firstName || '',
            lastName: userData?.data.lastName || '',
            email: userData?.data.email || '',
        })
        }, [userData])
    
        const array = [
        {
            name: 'juan',
            calle: 'roberto',
            numero: 'tuvieja',
            id: 1,
        },
        {
            name: 'juan',
            calle: 'roberto',
            numero: 'tuvieja',
            id: 2,
        },
        {
            name: 'juan',
            calle: 'roberto',
            numero: 'tuvieja',
            id: 3,
        },
        ]
        const neighborhoodArray = ['Lomas de Zamora', 'Palermo', 'Bandfield', 'Temperley', 'Lanús', 'Glew', 'Monte Grande']
        const inputHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
        }
    
        const formProfile = (
        <div className={styles.containFormDeliveryHeader}>
            <div className={styles.FormDeliveryHeader}>
            <input type='text' placeholder='Nombre' defaultValue={userData?.data.firstName} name='firstName' onChange={inputHandler} />
            <input type='text' placeholder='Apellido' defaultValue={userData?.data.lastName} name='lastName' onChange={inputHandler} />
            </div>
            <div className={styles.FormDeliveryBody}>
            <input type='text' placeholder='Email' defaultValue={userData?.data.email} name='email' onChange={inputHandler} />
            <input type='text' placeholder='Telofono (opcional)' onChange={inputHandler} />
            </div>
        </div>
        )
    
        const inputHandlerAddress = (e) => {
        setAddAddress({
            ...addAddress,
            [e.target.name]: e.target.value,
        })
        }
        const formAddress = (
        <div className={styles.containFormAddress}>
            <div className={styles.contiainInputsHeader}>
            <div className={styles.FormAddressHeader}>
                <input className={styles.inputAddress} name='street' type='text' placeholder='Direccion' onChange={inputHandlerAddress} />
            </div>
            <div>
                <input className={styles.inputNumber} name='number' type='Number' placeholder='Numero' onChange={inputHandlerAddress} />
            </div>
            </div>
            <div className={styles.FormAddressBody}>
            <input type='text' placeholder='Alias/Referencia' name='alias' onChange={inputHandlerAddress} />
            <select name='neighborhood' onChange={inputHandlerAddress}>
                <option>seleciona tu localidad perro</option>
                {neighborhoodArray.map((neigh, index) => (
                <option key={index}>{neigh}</option>
                ))}
            </select>
            </div>
        </div>
        )
    
        const changeViewAddress = (action) => {
        setViewAddress(action)
        }
        const changeViewCard = (action) => {
        setViewCard(action)
        }
        const card = (
        <div>
            <input type='text' placeholder='tarjeta' />
            <input type='text' placeholder='code' />
        </div>
        )
    
        const [cardTost, setCardTost] = useState({
        time: '',
        icon: '',
        text: '',
        view: false,
        })
    
        const emailRef = useRef()
        const sendForm = () => {
        if (emailRef.current?.value !== user.email) return alert('tenes el mail mal pa')
        if (!user) {
            let verificationAddress = Object.values(addAddress).some((add) => add === '')
            let verificationUser = Object.values(user).some((user) => user === '')
            if (delivery === 'send') {
            if (verificationUser || verificationAddress)
                return setCardTost({ time: 1500, icon: 'error', text: 'Complete todos los campos', view: true })
            } else {
            if (verificationUser) return setCardTost({ time: 1500, icon: 'error', text: 'Complete todos los campos', view: true })
            }
        }
        setCardTost({ time: 1500, icon: 'success', text: 'Enviado, todo ok', view: true })
        setPay(true)
        }

	return(
		<div className={styles.mainOrder}>
			<div className={styles.OrderContainer}>
                <h4 className={styles.orderNumber}><pan className={styles.title}>Nro de orden:</pan> 000 </h4>
                <div className={styles.table}>
                    <div className={styles.head}>
                        <div className={styles.title}>Cantidad</div>
                        <div className={styles.menu}>Menu</div>
                        {/* <div className={styles.title}>Extras</div> */}
                        <div className={styles.title}>Precio Unit.</div>
                    </div>
                    <div className={styles.bodyOrder}>
                        <div className={styles.data}>cantidad</div>
                        <div className={styles.data}>nombre</div>
                        {/* <div className={styles.data}>extras</div> */}
                        <div className={styles.data}>precio</div>
                    </div>
                    <div className={styles.bodyOrder}>
                        <div className={styles.data}>cantidad</div>
                        <div className={styles.data}>nombre</div>
                        {/* <div className={styles.data}>extras</div> */}
                        <div className={styles.data}>precio</div>
                    </div>
                    <div className={styles.bodyOrder}>
                        <div className={styles.data}>cantidad</div>
                        <div className={styles.data}>nombre</div>
                        {/* <div className={styles.data}>extras</div> */}
                        <div className={styles.data}>precio</div>
                    </div>
                </div>
                <div className={styles.totalPrice}>
                    <p><span>Total:</span> 000</p>
                </div>
            </div>
			<div className={styles.confirmContainer}>
                <div className={styles.containInfoSend}>
                    <div className={styles.containInfoName}>
                        <h3 className={styles.userData}><span>Nombre: </span>{user.firstName}</h3>
                        <h3 className={styles.userData}><span>Apellido: </span>{user.lastName}</h3>
                    </div>
                    <div className={styles.containInfoinput}>
                        <h3 className={styles.userData}><span>Confirme su email</span></h3>
                        <input className={styles.input} type='text' placeholder='Email' name='email' ref={emailRef} />
                    </div>
                </div>
                <div className={styles.containButtonSend}>
                    {/* <span>{pay && <button onClick={() => sendForm()}>Confirmar</button>}</span> */}
                    <button onClick={() => sendForm()}>Confirmar compra</button>
                </div>
            </div>
		</div>
	)
}

const mapStateToProps = (state) => {
    return {
        userData: state.users.userData,
        user: state.users.user,
        manageCart: state.users.manageCart
        }
    }

export default connect(mapStateToProps)(Order)