const mongoose = require('mongoose')

const url = 'mongodb://fullstack:jek-taysikasa@ds117158.mlab.com:17158/jek-fullstack'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

/*Note
  .find({})
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })*/
note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })