const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})

userSchema.statics.format = user => ({
  name: user.name,
  username: user.username,
  adult: user.adult,
  id: user._id,
  blogs: user.blogs
})

const User = mongoose.model('User', userSchema)

module.exports = User