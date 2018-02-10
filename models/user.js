const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

userSchema.virtual('password').get(function() {
  return null;
}).set(function(value) {
  const hash = bcrypt.hashSync(value, 10)
  this.passwordHash = hash;
})

userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

userSchema.statics.authenticate = function(username, password, done) {

  this.findOne({ username }, function(err, user) {
    if (err) {
      console.error('Error attempting to use static authenticate function', err);
      done(err)
    } else if (user && user.authenticate(password)) {
      console.log('This should be a successful login');
      done(null, user)
    } else {
      console.log('The user probably entered the incorrect password');
      done(null, false)
    }
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User;
