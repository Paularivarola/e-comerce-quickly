const adminProductReducer = (
  state = {
    products: [],
  },
  action
) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        products: action.payload,
      }
    case 'ADD_PRODUCT':
      return {
        products: [...state.products, action.payload],
      }
    case 'DELETE_PRODUCT':
      return {
        products: state.products.filter((product) => product._id !== action.payload),
      }
    case 'UPDATE_PRODUCT':
      return {
        products: state.products.map((product) => (product._id === action.payload._id ? action.payload : product)),
      }
    default:
      return { ...state }
  }
}

export default adminProductReducer
