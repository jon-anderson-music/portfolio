const express = require('express');
const router = express.Router()
const Helpers = require('../helpers')
const helpers = new Helpers()
const { authRequired } = helpers;

router.get('/', authRequired, (req, res) => {
  console.log('REQ USER', req.user)
  res.render('admin/index')
})

module.exports = router;
