const Ticket = require('../../models/Ticket')

const ticketControllers = {
  createTicket: async (req, res) => {
    try {
      await new Ticket({ ...req.body }).save()
      res.json({ success: true })
    } catch (err) {
      res.json({ success: false, error: err.message })
    }
  },
  getTickets: async (req, res) => {
    try {
      let tickets = Ticket.find()
      res.json({ success: true, tickets })
    } catch (err) {
      res.json({ success: false, error: err.message })
    }
  },
}

module.exports = ticketControllers
