const express = require('express');
const Helpers = require('../helpers');
const Audio = require('../models/audio');
const cloudinary = require('cloudinary');

const router = express.Router();

const helpers = new Helpers();
const { authRequired } = helpers;

router.get('/', authRequired, (req, res) => {
  Audio.find({}, (err, audioFiles) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).render('admin/audio', { active: 'Audios', audioFiles });
  });
});

router.post('/', authRequired, (req, res) => {
  console.log('BODY', req.body);
  cloudinary.v2.uploader.upload(req.body.audio, {
    resource_type: 'video',
  }, (err, result) => {
    if (err) {
      console.error('ERROR UPLOADING TO CLOUDINARY', err);
    } else {
      console.log('RESULT', result);
      const audioFile = {
        title: req.body.title,
        url: result.url,
      };
      Audio.create(audioFile, (error, audio) => {
        if (error) {
          console.error('ERROR SAVING PHOTO', err);
        } else {
          console.log('THE PHOTO SAVED', audio);
          res.json(audio);
        }
      });
    }
  });
});

module.exports = router;
