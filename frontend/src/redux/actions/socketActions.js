import io from 'socket.io-client'
const socketActions = {
  setSocketLS: (socketId) => {
    return (dispatch) => {
      let socket = io('https://quickly-food.herokuapp.com', { query: { socketId } })
      return dispatch({ type: 'SET_SOCKET', payload: { socket } })
    }
  },
}
export default socketActions
