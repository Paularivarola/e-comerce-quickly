const Review = require('../../models/Review')
const bcrypt = require('bcryptjs')

const adminReviewControllers = {
  getReviews: async (req, res) => {
    const { key } = req.user.admin
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      let reviews = await Review.find()
      res.json({ success: true, response: reviews })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  updateReview: async (req, res) => {
    const { key } = req.user.admin
    try {
      const match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      const review = await Review.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
      res.json({ success: true, response: review })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  deleteReview: async (req, res) => {
    const { key } = req.user.admin
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      await Review.findOneAndDelete({ _id: req.params.id })
      res.json({ success: true })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
}

module.exports = adminReviewControllers
