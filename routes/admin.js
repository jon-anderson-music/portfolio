const express = require('express');
const router = express.Router()
const Helpers = require('../helpers')
const helpers = new Helpers()
const { authRequired } = helpers;

router.get('/', authRequired, (req, res) => {
  res.render('admin/index', { active: 'Overview' })
})

router.get('/audio', authRequired, (req, res) => {
  res.render('admin/audio', { active: 'Audio' })
})

router.get('/video', authRequired, (req, res) => {
  res.render('admin/video', { active: 'Video' })
})

router.get('/photo', authRequired, (req, res) => {
  res.render('admin/photo', { active: 'Photos' })
})

module.exports = router;
