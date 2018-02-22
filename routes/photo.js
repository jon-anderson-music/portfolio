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
        description: req.body.description,
        url: result.url
      }
      Photo.create(image, (err, photo) => {
        if (err) {
          console.error('ERROR SAVING PHOTO', err)
        } else {
          console.log('THE PHOTO SAVED', photo)
          res.json(photo)
        }
      })
    }
  })
})

module.exports = router;