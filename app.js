require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

const DB = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const sess = {
  secret: 'asdfasdfqweoiavnklk',
  cookie: {
    secure: true,
    expires: false,
  },
  resave: false,
  saveUninitialized: false
}

if (process.env.NODE_ENV === 'development') {
  sess.cookie.secure = false;
}

console.log('SESSION', sess)

mongoose.connect(DB);
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(cookieParser());

app.use(session(sess));

app.use(passport.initialize())
app.use(passport.session())
require('./passportconfig').configure(passport);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', require('./routes/main'))
app.use('/admin', require('./routes/admin'))
app.use('/admin', require('./routes/auth'))

app.listen(PORT, () => {
  console.log(`Your app is running on PORT ${PORT}`)
})
