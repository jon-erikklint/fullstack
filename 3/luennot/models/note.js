const mongoose = require('mongoose')

const url = 'mongodb://fullstack:jek-taysikasa@ds117158.mlab.com:17158/jek-fullstack'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

module.exports = Note