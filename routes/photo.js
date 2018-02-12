const express = require('express');
const router = express.Router()
const Helpers = require('../helpers')
const helpers = new Helpers()
const { authRequired } = helpers;
const Photo = require('../models/photo')
const cloudinary = require('cloudinary')

router.get('/', authRequired, (req, res) => {
  Photo.find({}, (err, photos) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).render('admin/photo', { active: 'Photos', photos })
  })
})

router.post('/', authRequired, (req, res) => {
  console.log('BODY', req.body)
  cloudinary.v2.uploader.upload(req.body.image, function(err, result) {
    if (err) {
      console.error('ERROR UPLOADING TO CLOUDINARY', err);
    } else {
      console.log('RESULT', result);
      const image = {
        title: req.body.title,
        url: result.url
      }
      const photo = new Photo(image)
      photo.save((err, newPhoto) => {
        if (err) {
          res.status(500).send(err)
        }
        res.status(200).send(newPhoto)
      })
    }
  })
})

module.exports = router;
