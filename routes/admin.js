const express = require('express');
const router = express.Router()

const path = '../views/admin'

router.get('/', (req, res) => {
  res.render(`${path}/index`)
})

module.exports = router;
