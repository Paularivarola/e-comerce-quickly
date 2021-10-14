const adminUserReducer = (
  state = {
    users: [],
    reviews: [],
    user: [{}],
    tickets: [{}],
  },
  action
) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
      }
    case 'ADD_USER':
      return {
        ...state,
        users: state.users.push(action.payload),
      }
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      }
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)),
      }
    case 'GET_USER':
      return {
        ...state,
        user: state.users.filter((user) => user._id === action.payload),
      }
    case 'SET_TICKETS':
      const { tickets } = action.payload
      return {
        ...state,
        tickets,
      }
    // case "GET_REVIEWS":
    //     return {
    //         ...state,
    //         reviews: action.payload
    //     }
    default:
      return { ...state }
  }
}

export default adminUserReducer
