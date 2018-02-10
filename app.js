require('dotenv').config()

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/', require('./routes/main'))
app.use('/admin', require('./routes/admin'))

app.listen(PORT, () => {
  console.log(`Your app is running on PORT ${PORT}`)
})
