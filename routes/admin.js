const express = require('express');
const cloudinary = require('cloudinary');

const router = express.Router();
const Helpers = require('../helpers');

const helpers = new Helpers();
const { authRequired } = helpers;
const Audio = require('../models/audio');

router.get('/', authRequired, (req, res) => {
  res.render('admin/index', { active: 'Overview' });
});

router.get('/video', authRequired, (req, res) => {
  res.render('admin/video', { active: 'Video' });
});

module.exports = router;
