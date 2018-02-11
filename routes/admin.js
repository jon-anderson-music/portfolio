const express = require('express');
const router = express.Router()
const Helpers = require('../helpers')
const helpers = new Helpers()
const { authRequired } = helpers;

router.get('/', authRequired, (req, res) => {
  res.render('admin/index')
})

router.get('/audio', authRequired, (req, res) => {
  res.render('admin/audio')
})

router.get('/video', authRequired, (req, res) => {
  res.render('admin/video')
})

router.get('/photo', authRequired, (req, res) => {
  res.render('admin/photo')
})

module.exports = router;
