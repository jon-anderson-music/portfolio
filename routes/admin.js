const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  res.render('admin/index')
})

router.get('/register', (req, res) => {
  res.render('admin/register')
})

module.exports = router;
