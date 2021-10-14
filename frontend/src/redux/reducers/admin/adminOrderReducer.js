const adminOrderReducer = (
  state = {
    orders: [],
  },
  action
) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        orders: action.payload,
      }
    case 'DELETE_ORDER':
      return {
        orders: state.orders.filter((order) => order._id !== action.payload),
      }
    case 'UPDATE_ADMIN_ORDER':
      return {
        order: state.order.map((order) => (order._id === action.payload._id ? action.payload : order)),
      }
    default:
      return { ...state }
  }
}

export default adminOrderReducer
