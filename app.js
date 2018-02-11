require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/jon_anderson');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.use(passport.initialize())
app.use(passport.session())
require('./passportconfig').configure(passport);

app.use('/', require('./routes/main'))
app.use('/admin', require('./routes/admin'))
app.use('/admin', require('./routes/auth'))

app.set('view engine', 'ejs')

app.listen(PORT, () => {
  console.log(`Your app is running on PORT ${PORT}`)
})
