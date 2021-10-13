let initialState = {
  token: null,
  user: null,
  userData: null,
  cart: localStorage.getItem('cart') || [],
  orders: localStorage.getItem('orders') || [],
  socket: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      let { token, userData, user, keep } = action.payload
      localStorage.setItem('token', token)
      !keep && localStorage.setItem('cart', JSON.stringify(userData.cart))
      return {
        ...state,
        token: token,
        user: user,
        userData: userData,
        cart: keep ? state.cart : userData.cart,
      }
    case 'CREATE_ORDER':
      state.socket.emit('createOrder')
      let { newOrder } = action.payload
      return {
        ...state,
        orders: [...state.orders, newOrder],
        userData: action.payload.userData,
      }
    case 'CANCEL_ORDER':
      let { orderCancelled } = action.payload
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
