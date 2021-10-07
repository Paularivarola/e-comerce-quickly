import io from 'socket.io-client'
const socketActions = {
  setSocketLS: (socketId) => {
    return (dispatch) => {
      let socket = io('http://localhost:4000', { query: { socketId } })
      return dispatch({ type: 'SET_SOCKET', payload: { socket } })
    }
  },
}
export default socketActions
