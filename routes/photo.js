const express = require('express');
const router = express.Router()
const Helpers = require('../helpers')
const helpers = new Helpers()
const { authRequired } = helpers;
const Photo = require('../models/photo')
const cloudinary = require('cloudinary')

router.get('/', authRequired, (req, res) => {
  res.render('admin/photo', { active: 'Photos' })
})

router.post('/', authRequired, (req, res) => {
  console.log('BODY', req.body)
  cloudinary.uploader.upload()
})

module.exports = router;
