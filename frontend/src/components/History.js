import styles from '../styles/history.module.css'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import orderActions from '../redux/actions/orderActions'

const Order = ({ userData, order, index, cancellOrder }) => {
  const [address, setAddress] = useState('')
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })
  const { street, number, alias } = userData.addresses[order.deliveryAddress]
  useEffect(() => {
    setAddress(`${street} ${number} ${alias}`)
  }, [])
  let deliveryTime = order.deliveryTime.split(' ').slice(4, 5)[0]
  deliveryTime = deliveryTime.split(':').slice(0, 2).join(':')
  return (
    <div className={styles.boxHistory}>
      {/* {!order && 
      <div>
        <p>no hay pedidos</p>
      </div>
        } */}
      <img src='https://i.postimg.cc/yxFkk4g3/moto.png' alt='delivery' />
      <div className={styles.boxDelivery}>
        <p className={styles.state}>Estado de pedido</p>
        <p className={styles.text}>
          <span>Estado: </span>
          {order.status}
        </p>
        <p className={styles.text}>
          <span>Numero de orden: </span>
          {order.userId + '_ord' + index}
        </p>
        <p className={styles.text}>
          <span>Precio: </span>
          {formatter.format(order.purchased.reduce((acc, order) => acc + order.totalPrice, 0))}
        </p>
        <p className={styles.text}>
          <span>Punto de entrega: </span> {address}
        </p>
        <p className={styles.text}>
          <span>Hora estimada: </span>
          {deliveryTime}
        </p>
      </div>
      {order.status === 'Pendiente' && (
        <button
          onClick={() =>
            Swal.fire({
              title: 'Desea cancelar su orden?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                cancellOrder(order._id)
              }
            })
          }
          className={styles.buttonCancell}
        >
          Cancelar
        </button>
      )}
    </div>
  )
}

const History = ({ orders, userData, cancellOrder, ...props }) => {
  return (
    <div className={styles.mainHistory}>
      {[...orders]?.reverse().map((order, index) => (
        <Order cancellOrder={cancellOrder} key={order._id} userData={userData} order={order} index={index} />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    orders: state.users.orders,
  }
}

const mapDispatchToProps = {
  cancellOrder: orderActions.cancellOrder,
}
export default connect(mapStateToProps, mapDispatchToProps)(History)
