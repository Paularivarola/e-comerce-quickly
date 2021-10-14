let initialState = {
  token: null,
  user: null,
  userData: null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  orders: null,
  socket: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      let { token, userData, user } = action.payload
      localStorage.setItem('token', token)
      localStorage.setItem('cart', JSON.stringify(userData.cart))
      return {
        ...state,
        token: token,
        user: user,
        userData: userData,
        cart: userData.cart,
        orders: userData.ordersId,
      }
    case 'CREATE_ORDER':
      state.socket.emit('createOrder')
      let { newOrder } = action.payload
      return {
        ...state,
        orders: [...state.orders, newOrder],
        userData: action.payload.userData,
      }
    case 'CANCELL_ORDER':
      let { orderCancelled } = action.payload
      state.socket.emit('cancellOrder')
      const cancell = (orders) => {
        return orders.map((order) => {
          return order._id === orderCancelled._id ? orderCancelled : order
        })
      }
      return {
        ...state,
        orders: cancell(state.orders),
        userData: {
          ...state.userData,
          ordersId: cancell(state.userData.ordersId),
        },
      }
    case 'SET_SOCKET':
      const { socket } = action.payload
      return {
        ...state,
        socket,
      }
    case 'HANDLE_CART':
      localStorage.setItem('cart', JSON.stringify(action.payload.cart))
      return {
        ...state,
        userData: action.payload,
        cart: action.payload.cart,
      }
    case 'LS_CART':
      return { ...state, cart: action.payload }
    case 'RESET_CART':
      localStorage.setItem('cart', JSON.stringify([]))
      return { ...state, cart: [] }
    case 'EMIT_UPDATE':
      const { userId } = action.payload
      console.log(userId)
      state.socket.emit('updateOrders', userId)
      return state
    case 'UPDATE_USER_ORDERS':
      return {
        ...state,
        orders: action.payload,
        userData: { ...userData, ordersId: action.payload },
      }
    case 'LOG_OUT':
      localStorage.removeItem('token')
      localStorage.removeItem('socket')
      localStorage.setItem('cart', JSON.stringify([]))
      localStorage.setItem('orders', JSON.stringify([]))
      return initialState

    default:
      return state
  }
}

export default userReducer
