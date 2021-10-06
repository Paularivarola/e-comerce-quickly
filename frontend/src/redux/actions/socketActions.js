const socketActions = {
  setSocketLS: (socket) => {
    return (dispatch) => {
      return dispatch({ type: 'SET_SOCKET', payload: { socket } })
    }
  },
}
export default socketActions
