import axios from 'axios'
const HOST = 'https://quickly-food.herokuapp.com'
const ticketActions = {
  createTicket: (ticket) => {
    return async () => {
      try {
        await axios.post(`${HOST}/api/tickets`, ticket)
      } catch (err) {
        console.log(err.message)
      }
    }
  },
  getTickets: () => {
    return async (dispatch) => {
      let res = await axios.get(`${HOST}/api/tickets`)
      dispatch({ type: 'SET_TICKETS', payload: res.data })
    }
  },
}

export default ticketActions
