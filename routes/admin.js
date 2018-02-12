const express = require('express');
const router = express.Router()
const Helpers = require('../helpers')
const helpers = new Helpers()
const { authRequired } = helpers;
const Audio = require('../models/audio')

router.get('/', authRequired, (req, res) => {
  res.render('admin/index', { active: 'Overview' })
})

router.get('/audio', authRequired, (req, res) => {
  res.render('admin/audio', { active: 'Audio' })
})

router.post('/audio', authRequired, (req, res) => {
  console.log('HITTING AUDIO POST ROUTE')
  const audio = new Audio(req.body)
  audio.save((err, newAudio) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).send(newAudio)
  })
})

router.get('/video', authRequired, (req, res) => {
  res.render('admin/video', { active: 'Video' })
})

module.exports = router;
